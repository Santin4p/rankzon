#!/usr/bin/env node
/**
 * Downloads product images for categories with missing image directories.
 * Uses junglee/Amazon-crawler to fetch real Amazon.es product images.
 *
 * Usage: node scripts/download-missing-images.mjs
 * Requires: APIFY_TOKEN in .env.local
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ACTOR = 'junglee~Amazon-crawler'
const TAG = 'rankzon-21'

// Categories that need images (empty directories)
const PROBLEM_CATEGORIES = [
  'tiras-led',
  'cargadores-inalambricos',
  'powerbanks',
  'sillas-gaming',
  'cepillos-dentales-electricos',
  'relojes-hombre',
  'mochilas',
  'memorias-ram',
]

function loadEnv() {
  const envPath = join(ROOT, '.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const [k, ...v] = line.split('=')
    if (k && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join('=').trim()
    }
  }
}

function toSlug(name) {
  return name.toLowerCase()
    .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u').replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function extractAsin(affiliateUrl) {
  const m = affiliateUrl.match(/\/dp\/([A-Z0-9]{10})/)
  return m ? m[1] : null
}

async function apifyRunActor(token, input) {
  const res = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR}/runs`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
    }
  )
  if (!res.ok) throw new Error(`Actor run failed: ${res.status} ${await res.text()}`)
  const { data } = await res.json()
  return { runId: data.id, datasetId: data.defaultDatasetId }
}

async function apifyWait(token, runId, maxMinutes = 10) {
  const maxIterations = maxMinutes * 6 // check every 10 seconds
  for (let i = 0; i < maxIterations; i++) {
    await new Promise(r => setTimeout(r, 10000))
    const res = await fetch(`https://api.apify.com/v2/actor-runs/${runId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const { data } = await res.json()
    if (data.status === 'SUCCEEDED') return data
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(data.status))
      throw new Error(`Actor run ${data.status}`)
    process.stdout.write('.')
  }
  throw new Error('Timeout waiting for actor run')
}

async function apifyItems(token, datasetId) {
  const res = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?limit=200`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

async function downloadImage(imageUrl, filepath) {
  if (existsSync(filepath)) return false
  try {
    const res = await fetch(imageUrl)
    if (!res.ok) { console.warn(`  Image fetch failed: ${imageUrl}`); return false }
    writeFileSync(filepath, Buffer.from(await res.arrayBuffer()))
    return true
  } catch (e) {
    console.warn(`  Image download error: ${e.message}`)
    return false
  }
}

async function main() {
  loadEnv()
  const token = process.env.APIFY_TOKEN
  if (!token) { console.error('APIFY_TOKEN not set'); process.exit(1) }

  // Collect all products needing images
  const productRequests = [] // { category, position, name, asin, currentImagePath }

  for (const category of PROBLEM_CATEGORIES) {
    const jsonPath = join(ROOT, 'data', `${category}.json`)
    if (!existsSync(jsonPath)) { console.log(`Skip: ${category}.json not found`); continue }

    const data = JSON.parse(readFileSync(jsonPath, 'utf8'))
    if (!data.productos || data.productos.length === 0) {
      console.log(`Skip: ${category} has no products`)
      continue
    }

    const imgDir = join(ROOT, 'public', 'images', category)
    if (!existsSync(imgDir)) mkdirSync(imgDir, { recursive: true })

    for (const p of data.productos) {
      const asin = extractAsin(p.affiliate_url)
      if (!asin) continue

      // Check if the image already exists on disk
      const expectedFile = p.image.split('/').pop()
      const expectedPath = join(imgDir, expectedFile)
      if (existsSync(expectedPath)) continue // already have it

      productRequests.push({ category, position: p.position, name: p.name, asin })
    }
  }

  if (productRequests.length === 0) {
    console.log('All images already present — nothing to do.')
    return
  }

  console.log(`\nNeed to fetch images for ${productRequests.length} products across ${[...new Set(productRequests.map(r => r.category))].join(', ')}`)

  // Build URLs for the actor — batch all in one run
  const urls = productRequests.map(r => ({ url: `https://www.amazon.es/dp/${r.asin}` }))

  console.log(`\nStarting junglee/Amazon-crawler for ${urls.length} product URLs...`)
  const { runId, datasetId } = await apifyRunActor(token, {
    categoryOrProductUrls: urls,
    maxItemsPerStartUrl: 1,
    language: 'es',
    scrapeProductDetails: true,
    maxOffers: 0,
    scrapeSellers: false,
  })
  console.log(`Run ID: ${runId}`)
  process.stdout.write('Waiting')
  await apifyWait(token, runId, 15)
  console.log(' done')

  const items = await apifyItems(token, datasetId)
  console.log(`Got ${items.length} results`)

  // Build a lookup: asin → image URL
  const asinToImage = {}
  for (const item of items) {
    const asin = item.asin || extractAsin(item.url || '')
    if (!asin) continue
    // Actor returns images array or thumbnailImage
    const img = (item.images && item.images[0]) || item.thumbnailImage || item.image
    if (img) asinToImage[asin] = img
  }

  // Download images and update JSONs
  const categoryUpdates = {}

  for (const req of productRequests) {
    const img = asinToImage[req.asin]
    if (!img) {
      console.log(`  No image found for ${req.asin} (${req.name})`)
      continue
    }

    const imgDir = join(ROOT, 'public', 'images', req.category)
    const slug = toSlug(req.name)
    const filename = `${slug}.jpg`
    const filepath = join(imgDir, filename)

    const downloaded = await downloadImage(img, filepath)
    if (downloaded) {
      console.log(`  ✓ ${req.category}/${filename}`)
      if (!categoryUpdates[req.category]) categoryUpdates[req.category] = {}
      categoryUpdates[req.category][req.asin] = `/images/${req.category}/${filename}`
    }
  }

  // Update JSON files with correct image paths
  for (const [category, asinMap] of Object.entries(categoryUpdates)) {
    const jsonPath = join(ROOT, 'data', `${category}.json`)
    const data = JSON.parse(readFileSync(jsonPath, 'utf8'))
    let changed = false
    for (const p of data.productos) {
      const asin = extractAsin(p.affiliate_url)
      if (asin && asinMap[asin]) {
        p.image = asinMap[asin]
        changed = true
      }
    }
    if (changed) {
      writeFileSync(jsonPath, JSON.stringify(data, null, 2))
      console.log(`  Updated ${category}.json`)
    }
  }

  console.log('\nDone!')
}

main().catch(err => { console.error(err.message); process.exit(1) })

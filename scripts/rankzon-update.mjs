#!/usr/bin/env node
/**
 * Rankzon category updater
 * Usage: node scripts/rankzon-update.mjs <category>
 * Requires: APIFY_TOKEN in .env.local or env
 *
 * What it does:
 *   1. Calls Apify actor to scrape Amazon.es best sellers for the category
 *   2. Filters kids products, takes top 10 adults
 *   3. Downloads new product images to /public/images/<category>/
 *   4. Writes updated data/<category>.json
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// --- Config ---
const ACTOR = 'amazon-scraper~amazon-bestsellers-scraper'
const TAG = 'rankzon-21'
const MAX_ITEMS = 50 // first page only — enough to get 10 adults
const KIDS_WORDS = ['niño', 'niña', 'niños', 'niñas', 'infantil', 'kid', 'child', 'bebé']

// --- Helpers ---

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

function loadCategories() {
  return JSON.parse(readFileSync(join(__dirname, 'categories-urls.json'), 'utf8'))
}

function isKids(title) {
  const t = title.toLowerCase()
  return KIDS_WORDS.some(w => t.includes(w))
}

function cleanName(title) {
  return title
    .split(/,|：|；/)[0]                          // cut at first comma or CJK colon
    .replace(/\s+(Reloj Inteligente|Pulsera Actividad|para Android|para iOS).*$/i, '')
    .trim()
    .slice(0, 48)
    .trim()
}

function toSlug(name) {
  return name.toLowerCase()
    .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
    .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
    .replace(/[úùü]/g, 'u').replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function parsePrice(raw) {
  if (!raw) return null
  const n = parseFloat(raw.replace(/[€\s]/g, '').replace('.', '').replace(',', '.'))
  return isNaN(n) ? null : n
}

function badge(pos) {
  return pos === 1 ? 'Más vendido' : null
}

async function apifyRun(token, url) {
  const res = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR}/runs`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ urls: [url], subcategoryLevel: 0, nextPage: false, retries: 5 }),
    }
  )
  if (!res.ok) throw new Error(`Apify run failed: ${res.status} ${await res.text()}`)
  const { data } = await res.json()
  return { runId: data.id, datasetId: data.defaultDatasetId }
}

async function apifyWait(token, runId) {
  for (let i = 0; i < 24; i++) {                // max ~2 min
    await new Promise(r => setTimeout(r, 5000))
    const res = await fetch(`https://api.apify.com/v2/actor-runs/${runId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const { data } = await res.json()
    if (data.status === 'SUCCEEDED') return
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(data.status))
      throw new Error(`Actor run ${data.status}`)
    process.stdout.write('.')
  }
  throw new Error('Timeout waiting for actor run')
}

async function apifyItems(token, datasetId) {
  const res = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?limit=${MAX_ITEMS}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

async function downloadImage(imageUrl, filepath) {
  if (existsSync(filepath)) return false          // already have it
  const res = await fetch(imageUrl)
  if (!res.ok) { console.warn(`  Image fetch failed: ${imageUrl}`); return false }
  writeFileSync(filepath, Buffer.from(await res.arrayBuffer()))
  return true
}

// --- Main ---

async function main() {
  loadEnv()

  const category = process.argv[2]
  const categories = loadCategories()

  if (!category || !categories[category]) {
    console.error(`Usage: node scripts/rankzon-update.mjs <category>`)
    console.error(`Available: ${Object.keys(categories).join(', ')}`)
    process.exit(1)
  }

  const { amazonUrl, name } = categories[category]
  if (!amazonUrl) {
    console.error(`No amazonUrl configured for "${category}" in scripts/categories-urls.json`)
    process.exit(1)
  }

  const token = process.env.APIFY_TOKEN
  if (!token) {
    console.error('APIFY_TOKEN not set. Add it to .env.local or export it.')
    process.exit(1)
  }

  console.log(`\nUpdating ${name} (${category})`)
  console.log(`Source: ${amazonUrl}`)

  // 1. Scrape
  process.stdout.write('Running Apify actor')
  const { runId, datasetId } = await apifyRun(token, amazonUrl)
  await apifyWait(token, runId)
  console.log(' done')

  const items = await apifyItems(token, datasetId)
  console.log(`Fetched ${items.length} items from Amazon.es`)

  // 2. Filter + deduplicate by ASIN and cleaned name + top 10
  const seenAsins = new Set()
  const seenNames = new Set()
  const adults = items.filter(item => {
    if (!item.title || isKids(item.title)) return false
    if (seenAsins.has(item.asin)) return false
    const name = cleanName(item.title)
    if (seenNames.has(name)) return false
    seenAsins.add(item.asin)
    seenNames.add(name)
    return true
  })
  const top10 = adults.slice(0, 10)
  console.log(`After filtering kids: ${adults.length} adult products → taking top ${top10.length}`)

  // 3. Process images
  const imgDir = join(ROOT, 'public', 'images', category)
  if (!existsSync(imgDir)) mkdirSync(imgDir, { recursive: true })

  const productos = []
  for (let i = 0; i < top10.length; i++) {
    const item = top10[i]
    const name = cleanName(item.title)
    const slug = toSlug(name)
    const imgFilename = `${slug}.jpg`
    const imgPath = join(imgDir, imgFilename)

    const downloaded = await downloadImage(item.image, imgPath)
    if (downloaded) console.log(`  Downloaded image: ${imgFilename}`)

    productos.push({
      position: i + 1,
      name,
      image: `/images/${category}/${imgFilename}`,
      price: parsePrice(item.price),
      affiliate_url: `https://www.amazon.es/dp/${item.asin}?tag=${TAG}`,
      badge: badge(i + 1),
    })
  }

  // 4. Write JSON
  const output = {
    categoria: category,
    updated_at: new Date().toISOString().split('T')[0],
    productos,
  }
  const outputPath = join(ROOT, 'data', `${category}.json`)
  writeFileSync(outputPath, JSON.stringify(output, null, 2))

  console.log(`\nDone. Updated ${outputPath}`)
  console.log(`Products: ${productos.map(p => `\n  ${p.position}. ${p.name} — ${p.price}€`).join('')}`)
}

main().catch(err => { console.error(err.message); process.exit(1) })

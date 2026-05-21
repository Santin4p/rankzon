#!/usr/bin/env node
/**
 * Batch enrichment: runs enrich-reviews logic for multiple categories in parallel.
 * Usage: node scripts/enrich-all.mjs [concurrency=4]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const REVIEWS_ACTOR = 'web_wanderer~amazon-reviews-extractor'
const REVIEWS_PER_PRODUCT = 2
const TOP_N = 3
const CONCURRENCY = parseInt(process.argv[2] || '4', 10)

const CATEGORIES = [
  'auriculares','smartwatches','altavoces-bluetooth','moviles','portatiles',
  'tablets','televisores','monitores','impresoras','routers-wifi',
  'discos-duros-externos','lectores-ebook','freidoras-aire','robots-aspirador',
  'cafeteras','aspiradoras','microondas','batidoras','purificadores-aire',
  'ollas-programables','afeitadoras-electricas','secadores-pelo','planchas-pelo',
  'cuidado-piel','maquillaje','cuidado-pelo','mandos-gaming','auriculares-gaming',
  'ratones-gaming','teclados-gaming','realidad-virtual','alfombrillas-gaming',
  'webcams','microfonos-gaming','juegos-ps5','juegos-switch','juegos-xbox',
  'juegos-switch-2','padel'
]

function loadEnv() {
  const envPath = join(ROOT, '.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const [k, ...v] = line.split('=')
    if (k?.trim() && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join('=').trim()
    }
  }
}

function asinFromUrl(url) {
  const m = url.match(/\/dp\/([A-Z0-9]{10})/)
  return m ? m[1] : null
}

async function apifyRun(token, input) {
  const res = await fetch(
    `https://api.apify.com/v2/acts/${REVIEWS_ACTOR}/runs`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(input),
    }
  )
  if (!res.ok) throw new Error(`Apify run failed: ${res.status} ${await res.text()}`)
  const { data } = await res.json()
  return { runId: data.id, datasetId: data.defaultDatasetId }
}

async function apifyWait(token, runId) {
  for (let i = 0; i < 36; i++) {
    await new Promise(r => setTimeout(r, 5000))
    const res = await fetch(`https://api.apify.com/v2/actor-runs/${runId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const { data } = await res.json()
    if (data.status === 'SUCCEEDED') return
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(data.status))
      throw new Error(`Actor run ${data.status}`)
  }
  throw new Error('Timeout waiting for actor run')
}

async function apifyItems(token, datasetId) {
  const res = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?limit=100`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

async function scrapeReviews(token, asin) {
  const { runId, datasetId } = await apifyRun(token, {
    products: [asin],
    region: 'amazon.es',
    language: 'es',
    limit: REVIEWS_PER_PRODUCT,
    sort: 'helpful',
    avp_reviews: true,
    rating: 'all',
  })
  await apifyWait(token, runId)
  return apifyItems(token, datasetId)
}

async function extractWithClaude(client, productName, reviews) {
  const reviewTexts = reviews
    .filter(r => r.review_text?.trim())
    .slice(0, 20)
    .map((r, i) => `[${i + 1}] (${r.rating}★) ${r.review_text.trim()}`)
    .join('\n\n')

  if (!reviewTexts) throw new Error('No review text found')

  const prompt = `Analiza estas reseñas de "${productName}" de Amazon España y extrae la información más relevante.

RESEÑAS:
${reviewTexts}

Responde SOLO con un objeto JSON válido, sin texto adicional, con esta estructura exacta:
{
  "pros": ["punto positivo 1", "punto positivo 2", "punto positivo 3"],
  "cons": ["punto negativo 1", "punto negativo 2", "punto negativo 3"],
  "user_summary": "Resumen en 2 frases de lo que opinan los compradores. Empieza con 'Los compradores...' o 'La mayoría de usuarios...'"
}

Reglas:
- Cada pro/contra: máximo 8 palabras, en español, concreto y específico
- user_summary: 2 frases máximo, objetivo, en español
- Basa todo SOLO en las reseñas proporcionadas, no en conocimiento previo`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].text.trim()
  const json = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
  return JSON.parse(json)
}

async function enrichCategory(category, apifyToken, client) {
  const dataPath = join(ROOT, 'data', `${category}.json`)
  if (!existsSync(dataPath)) {
    console.log(`[${category}] SKIP — file not found`)
    return
  }

  const data = JSON.parse(readFileSync(dataPath, 'utf8'))
  const top = data.productos.filter(p => p.position <= TOP_N)
  let changed = false

  for (const producto of top) {
    if (producto.pros && producto.pros.length > 0) {
      console.log(`[${category}] #${producto.position} already enriched, skipping`)
      continue
    }

    const asin = asinFromUrl(producto.affiliate_url)
    if (!asin) {
      console.log(`[${category}] #${producto.position} no ASIN, skipping`)
      continue
    }

    try {
      const reviews = await scrapeReviews(apifyToken, asin)
      if (reviews.length === 0) {
        console.log(`[${category}] #${producto.position} no reviews found`)
        continue
      }

      const extracted = await extractWithClaude(client, producto.name, reviews)
      producto.pros = extracted.pros
      producto.cons = extracted.cons
      producto.user_summary = extracted.user_summary
      changed = true
      console.log(`[${category}] #${producto.position} ✓ enriched`)
    } catch (err) {
      console.log(`[${category}] #${producto.position} ERROR: ${err.message}`)
    }
  }

  if (changed) {
    writeFileSync(dataPath, JSON.stringify(data, null, 2))
    console.log(`[${category}] saved`)
  }
}

async function runWithConcurrency(items, fn, concurrency) {
  const results = []
  let i = 0

  async function worker() {
    while (i < items.length) {
      const item = items[i++]
      await fn(item)
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, worker)
  await Promise.all(workers)
  return results
}

async function main() {
  loadEnv()

  const apifyToken = process.env.APIFY_TOKEN
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (!apifyToken) { console.error('APIFY_TOKEN not set'); process.exit(1) }
  if (!anthropicKey) { console.error('ANTHROPIC_API_KEY not set'); process.exit(1) }

  const client = new Anthropic({ apiKey: anthropicKey })

  console.log(`Starting enrichment for ${CATEGORIES.length} categories with concurrency ${CONCURRENCY}`)
  const start = Date.now()

  await runWithConcurrency(
    CATEGORIES,
    (cat) => enrichCategory(cat, apifyToken, client),
    CONCURRENCY
  )

  const elapsed = Math.round((Date.now() - start) / 1000)
  console.log(`\nDone! All categories enriched in ${elapsed}s`)
}

main().catch(err => { console.error(err.message); process.exit(1) })

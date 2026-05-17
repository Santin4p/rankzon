#!/usr/bin/env node
/**
 * Enrich top 3 products of a category with pros, cons and user_summary
 * by scraping Amazon.es reviews (Apify) and summarizing with Claude.
 *
 * Usage:
 *   node scripts/enrich-reviews.mjs <category>
 *   node scripts/enrich-reviews.mjs auriculares
 *
 * Requires in .env.local:
 *   APIFY_TOKEN=...
 *   ANTHROPIC_API_KEY=...
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const REVIEWS_ACTOR = 'web_wanderer~amazon-reviews-extractor'
const REVIEWS_PER_PRODUCT = 2   // pages (1 page ≈ 10 reviews) — keeps cost low
const TOP_N = 3                  // only enrich the top N products

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Apify helpers (reuses pattern from rankzon-update.mjs)

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
  for (let i = 0; i < 36; i++) {   // max 3 min
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

// ---------------------------------------------------------------------------
// Claude helper

async function extractWithClaude(client, productName, reviews) {
  const reviewTexts = reviews
    .filter(r => r.review_text?.trim())
    .slice(0, 20)  // cap at 20 to avoid huge prompts
    .map((r, i) => `[${i + 1}] (${r.rating}★) ${r.review_text.trim()}`)
    .join('\n\n')

  if (!reviewTexts) throw new Error('No review text found in scraped data')

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
  // Strip markdown code fences if present
  const json = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
  return JSON.parse(json)
}

// ---------------------------------------------------------------------------

async function main() {
  loadEnv()

  const category = process.argv[2]
  if (!category) {
    console.error('Usage: node scripts/enrich-reviews.mjs <category>')
    process.exit(1)
  }

  const apifyToken = process.env.APIFY_TOKEN
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (!apifyToken) { console.error('APIFY_TOKEN not set in .env.local'); process.exit(1) }
  if (!anthropicKey) { console.error('ANTHROPIC_API_KEY not set in .env.local'); process.exit(1) }

  const dataPath = join(ROOT, 'data', `${category}.json`)
  if (!existsSync(dataPath)) {
    console.error(`Data file not found: ${dataPath}`)
    process.exit(1)
  }

  const data = JSON.parse(readFileSync(dataPath, 'utf8'))
  const client = new Anthropic({ apiKey: anthropicKey })

  const top = data.productos.filter(p => p.position <= TOP_N)
  console.log(`\nEnriching top ${top.length} products of "${category}"\n`)

  for (const producto of top) {
    const asin = asinFromUrl(producto.affiliate_url)
    if (!asin) { console.warn(`  No ASIN found for "${producto.name}", skipping`); continue }

    console.log(`[${producto.position}] ${producto.name} (${asin})`)

    // 1. Scrape reviews
    process.stdout.write('  Scraping reviews')
    let reviews
    try {
      reviews = await scrapeReviews(apifyToken, asin)
      console.log(` → ${reviews.length} reviews`)
    } catch (err) {
      console.error(`  ERROR scraping: ${err.message}`)
      continue
    }

    if (reviews.length === 0) {
      console.warn('  No reviews found, skipping')
      continue
    }

    // 2. Extract with Claude
    process.stdout.write('  Extracting pros/cons with Claude')
    let extracted
    try {
      extracted = await extractWithClaude(client, producto.name, reviews)
      console.log(' ✓')
    } catch (err) {
      console.error(`  ERROR extracting: ${err.message}`)
      continue
    }

    // 3. Merge into product
    producto.pros = extracted.pros
    producto.cons = extracted.cons
    producto.user_summary = extracted.user_summary

    console.log(`  Pros: ${extracted.pros.join(' · ')}`)
    console.log(`  Cons: ${extracted.cons.join(' · ')}`)
    console.log(`  Summary: ${extracted.user_summary}\n`)
  }

  // 4. Write updated JSON
  writeFileSync(dataPath, JSON.stringify(data, null, 2))
  console.log(`Done. Updated ${dataPath}`)
}

main().catch(err => { console.error(err.message); process.exit(1) })

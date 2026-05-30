#!/usr/bin/env node
/**
 * Pre-build: updates updated_at in all data/*.json to today's date.
 * Runs automatically via "prebuild" in package.json.
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')
const today = new Date().toISOString().split('T')[0]

let updated = 0
for (const file of readdirSync(dataDir).filter(f => f.endsWith('.json'))) {
  const path = join(dataDir, file)
  try {
    const data = JSON.parse(readFileSync(path, 'utf8'))
    if ('updated_at' in data && data.updated_at !== today) {
      data.updated_at = today
      writeFileSync(path, JSON.stringify(data, null, 2))
      updated++
    }
  } catch {
    // skip malformed files
  }
}

if (updated > 0) console.log(`[update-dates] Updated ${updated} files to ${today}`)

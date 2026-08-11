// Keeps the repo-root README.md in sync with projects/bx-rest/README.md.
//
// projects/bx-rest/README.md is the source of truth: ng-packagr publishes it
// as-is into the npm package, and it's also what renders on the npm page.
// The repo-root README.md only exists so the same content renders on the
// GitHub landing page. Never edit README.md by hand — edit
// projects/bx-rest/README.md and run `npm run sync-readme` (or `npm run
// build`, which does it automatically via the `prebuild` hook).

import { copyFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const source = join(rootDir, 'projects', 'bx-rest', 'README.md')
const target = join(rootDir, 'README.md')

const banner = '<!-- This file is generated from projects/bx-rest/README.md by `npm run sync-readme`. Do not edit directly. -->\n\n'

copyFileSync(source, target)
const content = readFileSync(target, 'utf8')
if (!content.startsWith(banner)) {
  const fs = await import('node:fs')
  fs.writeFileSync(target, banner + content)
}

console.log(`Synced ${source} -> ${target}`)

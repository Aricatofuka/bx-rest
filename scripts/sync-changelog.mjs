// Keeps the repo-root CHANGELOG.md in sync with projects/bx-rest/CHANGELOG.md.
//
// projects/bx-rest/CHANGELOG.md is the source of truth: ng-packagr publishes
// it as-is into the npm package. The repo-root copy only exists so the same
// content renders on the GitHub landing page. Never edit the repo-root file
// by hand — edit the projects/bx-rest/ version and run `npm run
// sync-changelog` (or `npm run build`, which does it automatically via the
// `prebuild` hook).

import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

const file = 'CHANGELOG.md'
const source = join(rootDir, 'projects', 'bx-rest', file)
const target = join(rootDir, file)
const banner = `<!-- This file is generated from projects/bx-rest/${file} by \`npm run sync-changelog\`. Do not edit directly. -->\n\n`

copyFileSync(source, target)
const content = readFileSync(target, 'utf8')
if (!content.startsWith(banner)) {
  writeFileSync(target, banner + content)
}

console.log(`Synced ${source} -> ${target}`)

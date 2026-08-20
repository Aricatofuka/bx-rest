// Keeps the repo-root README.md and README.en.md in sync with
// projects/bx-rest/README.md and projects/bx-rest/README.en.md.
//
// projects/bx-rest/README.md (Russian, primary) and README.en.md (English
// translation) are the source of truth: ng-packagr publishes README.md
// as-is into the npm package, and it's also what renders on the npm page.
// The repo-root copies only exist so the same content renders on the
// GitHub landing page. Never edit the repo-root files by hand — edit the
// projects/bx-rest/ versions and run `npm run sync-readme` (or `npm run
// build`, which does it automatically via the `prebuild` hook).

import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))

const files = ['README.md', 'README.en.md']

for (const file of files) {
  const source = join(rootDir, 'projects', 'bx-rest', file)
  const target = join(rootDir, file)
  const banner = `<!-- This file is generated from projects/bx-rest/${file} by \`npm run sync-readme\`. Do not edit directly. -->\n\n`

  copyFileSync(source, target)
  const content = readFileSync(target, 'utf8')
  if (!content.startsWith(banner)) {
    writeFileSync(target, banner + content)
  }

  console.log(`Synced ${source} -> ${target}`)
}

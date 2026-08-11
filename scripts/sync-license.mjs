// Keeps projects/bx-rest/LICENSE in sync with the repo-root LICENSE.
//
// The root LICENSE is the source of truth. ng-packagr can only copy assets
// that live inside the library's project root (projects/bx-rest), so a copy
// has to exist there too for it to end up in the published npm package.
// The copy is committed (LICENSE text rarely changes) — run
// `npm run sync-license` (or `npm run build`, via the `prebuild` hook) after
// editing the root LICENSE, e.g. on a copyright year bump.

import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const source = join(rootDir, 'LICENSE')
const target = join(rootDir, 'projects', 'bx-rest', 'LICENSE')

copyFileSync(source, target)
console.log(`Synced ${source} -> ${target}`)

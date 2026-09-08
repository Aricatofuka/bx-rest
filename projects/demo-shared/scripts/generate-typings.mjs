// Зеркалит .d.ts-файлы bx-rest и rxjs в один сгенерированный TS-модуль,
// который monacoSetup.ts потом раскладывает обратно по тем же относительным
// путям через addExtraLib — так Monaco получает настоящие типы bx-rest
// (а не собранный вручную бандл) и сам резолвит относительные импорты между
// файлами так же, как это делает обычный node_modules.
//
// Требует, чтобы `npm run build` в корне репозитория уже был выполнен
// (нужен projects/../../dist/bx-rest) — обычно это часть `npm run demo:bootstrap`.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const demoSharedDir = dirname(dirname(fileURLToPath(import.meta.url)))
const repoRoot = dirname(dirname(demoSharedDir))

const sources = [
  {
    packageName: 'bx-rest',
    dir: join(repoRoot, 'dist', 'bx-rest')
  },
  {
    packageName: 'rxjs',
    dir: join(demoSharedDir, 'node_modules', 'rxjs')
  }
]

function collectDtsFiles(rootDir) {
  const results = []

  function walk(current) {
    for (const entry of readdirSync(current)) {
      const fullPath = join(current, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        if (entry === 'node_modules') continue
        walk(fullPath)
      } else if (entry.endsWith('.d.ts')) {
        results.push(fullPath)
      }
    }
  }

  walk(rootDir)
  return results
}

const typeFiles = []

for (const source of sources) {
  if (!existsSync(source.dir)) {
    console.warn(
      `[generate-typings] Пропускаю ${source.packageName}: не найдена папка ${source.dir}. ` +
        (source.packageName === 'bx-rest'
          ? 'Сначала выполните `npm run build` в корне репозитория.'
          : 'Сначала выполните `npm install` в projects/demo-shared.')
    )
    continue
  }

  const files = collectDtsFiles(source.dir)
  for (const filePath of files) {
    const relPath = relative(source.dir, filePath).split('\\').join('/')
    typeFiles.push({
      path: `${source.packageName}/${relPath}`,
      content: readFileSync(filePath, 'utf8')
    })
  }
  console.log(`[generate-typings] ${source.packageName}: ${files.length} файлов .d.ts`)
}

const outFile = join(demoSharedDir, 'src', 'generated', 'typeFiles.ts')

const body = typeFiles
  .map(file => `  { path: ${JSON.stringify(file.path)}, content: ${JSON.stringify(file.content)} }`)
  .join(',\n')

const content = `// Сгенерировано projects/demo-shared/scripts/generate-typings.mjs — не редактировать руками.
export interface TypeFile {
  path: string
  content: string
}

export const typeFiles: TypeFile[] = [
${body}
]
`

const outDir = dirname(outFile)
if (!existsSync(outDir)) {
  await import('node:fs').then(fs => fs.mkdirSync(outDir, { recursive: true }))
}

await import('node:fs').then(fs => fs.writeFileSync(outFile, content))

console.log(`[generate-typings] Записано ${typeFiles.length} файлов в ${relative(repoRoot, outFile)}`)

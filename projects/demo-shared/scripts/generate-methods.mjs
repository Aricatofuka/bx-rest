// Список методов клиента BXRestNavvy для проверки методов в демо.
//
// Источник — снимок projects/bx-rest/src/rest/__snapshots__/method-names.txt. Его пишет
// и сверяет с клиентом тест method-names.spec.ts, поэтому список всегда совпадает с клиентом.
// Результат — src/generated/clientMethods.ts, в git он не попадает.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const demoSharedDir = dirname(dirname(fileURLToPath(import.meta.url)))
const repoRoot = dirname(dirname(demoSharedDir))
const snapshot = join(repoRoot, 'projects', 'bx-rest', 'src', 'rest', '__snapshots__', 'method-names.txt')
const outFile = join(demoSharedDir, 'src', 'generated', 'clientMethods.ts')

const methods = []
for (const line of readFileSync(snapshot, 'utf8').split(/\r?\n/)) {
  if (!line || line.startsWith('#')) continue
  // `crm.deal.list -> crm.deal.list (NavvyPag)` или `bizProc.startProcFormNewsFeed (Observable)`
  const withRest = /^(\S+) -> (\S+) \((\w+)\)$/.exec(line)
  const withoutRest = /^(\S+) \((\w+)\)$/.exec(line)
  if (withRest) {
    methods.push({ path: withRest[1], rest: withRest[2], kind: withRest[3] })
  } else if (withoutRest) {
    methods.push({ path: withoutRest[1], kind: withoutRest[2] })
  } else {
    throw new Error(`Unexpected line in ${snapshot}: ${line}`)
  }
}

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, [
  '// Сгенерировано scripts/generate-methods.mjs из method-names.txt, руками не править.',
  '',
  'export interface ClientMethodEntry {',
  '  /** Путь от клиента: `crm.deal.list` */',
  '  path: string',
  '  /** REST-имя, если метод возвращает объект запроса */',
  '  rest?: string',
  '  /** Класс объекта запроса или что вернул метод: `NavvyPag`, `Observable`, `throws` */',
  '  kind: string',
  '}',
  '',
  `export const CLIENT_METHODS: readonly ClientMethodEntry[] = ${JSON.stringify(methods, null, 2)}`,
  '',
].join('\n'))

console.log(`[generate-methods] ${methods.length} methods -> ${outFile}`)

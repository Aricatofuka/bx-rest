// Проверяет собранный пакет dist/bx-rest так, как его получит пользователь из npm:
//   1. npm pack и установка архива в чистый проект во временной папке;
//   2. импорт пакета в Node: архив содержит всё нужное, экспорты на месте;
//   3. проверка типов под moduleResolution bundler и nodenext без skipLibCheck:
//      импортируются все точки входа из exports, ключевые типы не должны стать any;
//   4. размер бандла (esbuild, minify) для приложения, которое импортирует только
//      BXRestFrame. Он остаётся маленьким, пока пакет хорошо вытряхивается (tree-shaking):
//      один статический инициализатор или декоратор утягивает в бандл всё, на что ссылается.
//
// Перед запуском нужна сборка: npm run build. Запуск: npm run check:package
// (--keep оставляет временную папку для разбора).
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

// Бандл только с BXRestFrame: 8310 байт в 1.7.0. До исправления tree-shaking было 117 КБ.
const FRAME_SIZE_LIMIT = 10 * 1024

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(repoRoot, 'dist', 'bx-rest')
const keep = process.argv.includes('--keep')

if (!existsSync(join(dist, 'package.json'))) {
  console.error('[check:package] dist/bx-rest is missing. Run "npm run build" first.')
  process.exit(1)
}

const failures = []
const fail = (message) => {
  failures.push(message)
  console.error(`[check:package] FAIL: ${message}`)
}
const ok = (message) => console.log(`[check:package] ok: ${message}`)

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' })
  if (result.error) throw result.error
  return result
}

// npm из того же npm, что запустил скрипт (npm run check:package): так он работает и на
// Windows, где npm — это .cmd-файл. При запуске напрямую — npm из PATH.
function npm(args, cwd) {
  const result = process.env.npm_execpath
    ? run(process.execPath, [process.env.npm_execpath, ...args], cwd)
    : spawnSync(['npm', ...args].join(' '), { cwd, encoding: 'utf8', shell: true })
  if (result.status !== 0) {
    console.error(result.stdout, result.stderr)
    throw new Error(`npm ${args.join(' ')} failed with code ${result.status}`)
  }
  return result.stdout
}

const pkg = JSON.parse(readFileSync(join(dist, 'package.json'), 'utf8'))
const consumer = mkdtempSync(join(tmpdir(), 'bx-rest-package-'))
console.log(`[check:package] bx-rest ${pkg.version}, consumer project: ${consumer}`)

try {
  // 1. Архив и установка
  // npm 10 отдаёт массив, npm 12 — объект с ключом по имени пакета
  const packed = JSON.parse(npm(['pack', dist, '--pack-destination', consumer, '--json'], consumer))
  const { filename } = Array.isArray(packed) ? packed[0] : Object.values(packed)[0]
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ name: 'consumer', private: true, type: 'module' }, null, 2))
  npm(['install', `./${filename}`, '--no-audit', '--no-fund'], consumer)
  ok(`${filename} installed`)

  // 2. Импорт в Node
  writeFileSync(join(consumer, 'smoke.mjs'), `
import * as lib from 'bx-rest'
const expected = ['BXRestNavvy', 'BXRestSettings', 'BXRestFrame', 'Navvy', 'BXRestRequest', 'BXRestMap',
  'BXRestApiError', 'BXRestTimeoutError', 'BXRestHttpError', 'isBXRestAnswerSuccess']
const missing = expected.filter(name => lib[name] === undefined)
if (missing.length) throw new Error('missing exports: ' + missing.join(', '))
const portal = new lib.BXRestNavvy({
  auth: { source: () => 'token', key: 'auth' },
  urls: { source: 'string', key: 'https://portal.test', additional_part: 'rest' },
})
const request = portal.crm.deal.list({ select: ['ID'], filter: {}, start: 0 })
if (typeof request.resAll !== 'function') throw new Error('crm.deal.list has no resAll()')
`)
  const smoke = run(process.execPath, ['smoke.mjs'], consumer)
  if (smoke.status === 0) ok(`import in Node ${process.version}`)
  else fail(`import in Node ${process.version}:\n${smoke.stderr}`)

  // 3. Типы: каждая точка входа из exports и ключевые типы, которые не должны стать any.
  // any появляется молча, если TypeScript не нашёл импорт внутри .d.ts.
  const subpaths = Object.keys(pkg.exports).filter(key => key !== '.' && key !== './package.json')
  writeFileSync(join(consumer, 'check.ts'), [
    `import { firstValueFrom, type Observable } from 'rxjs'`,
    `import { BXRestNavvy, BXRestFrame, BXRestApiError, BXRestTimeoutError } from 'bx-rest'`,
    `import type { iBXRestSettings, BXRestMiddleware } from 'bx-rest'`,
    `import type { iBXRestUser } from 'bx-rest/typification/user'`,
    `import type { iBXRestCalendarEventGetAnswer } from 'bx-rest/typification/calendar'`,
    ...subpaths.map((subpath, i) => `import type * as entry${i} from 'bx-rest/${subpath.slice(2)}'`),
    ``,
    `type IsAny<T> = 0 extends 1 & T ? true : false`,
    `type ResultOf<T> = T extends Observable<infer V> ? V : never`,
    ``,
    `const portal = new BXRestNavvy({`,
    `  auth: { source: () => 'token', key: 'auth' },`,
    `  urls: { source: 'string', key: 'https://portal.test', additional_part: 'rest' },`,
    `  retryOnQueryLimit: true,`,
    `  timeout: 30000,`,
    `})`,
    `const deals = portal.crm.deal.list({ select: ['ID', 'TITLE'], filter: {}, start: 0 }).resAll()`,
    `export const firstDeal = async () => (await firstValueFrom(deals))[0]?.title`,
    ``,
    `export const notAny: [`,
    `  IsAny<BXRestNavvy>, IsAny<typeof BXRestFrame>, IsAny<iBXRestSettings>, IsAny<BXRestMiddleware>,`,
    `  IsAny<ResultOf<typeof deals>>, IsAny<BXRestApiError>, IsAny<BXRestTimeoutError>,`,
    `  IsAny<iBXRestUser>, IsAny<iBXRestCalendarEventGetAnswer['TZ_FROM']>,`,
    `] = [false, false, false, false, false, false, false, false, false]`,
    ``,
    ...subpaths.map((_, i) => `export type Entry${i} = typeof entry${i}`),
    ``,
  ].join('\n'))

  const tsc = join(repoRoot, 'node_modules', 'typescript', 'bin', 'tsc')
  const { version: tsVersion } = JSON.parse(readFileSync(join(repoRoot, 'node_modules', 'typescript', 'package.json'), 'utf8'))
  for (const [resolution, module] of [['bundler', 'ES2022'], ['nodenext', 'NodeNext']]) {
    const result = run(process.execPath, [
      tsc, '--noEmit', '--strict', '--skipLibCheck', 'false', '--target', 'ES2022', '--lib', 'ES2022,DOM',
      '--module', module, '--moduleResolution', resolution, 'check.ts',
    ], consumer)
    const label = `types, moduleResolution ${resolution}, TypeScript ${tsVersion}, ${subpaths.length + 1} entry points`
    if (result.status === 0) ok(label)
    else fail(`${label}:\n${result.stdout}${result.stderr}`)
  }

  // 4. Размер
  let esbuild
  try {
    esbuild = await import('esbuild')
  } catch {
    // esbuild приходит в node_modules с @angular-devkit/build-angular
    throw new Error('esbuild is not installed in the repository node_modules')
  }
  for (const name of ['BXRestFrame', 'BXRestNavvy']) {
    const entry = join(consumer, `size-${name}.mjs`)
    writeFileSync(entry, `import { ${name} } from 'bx-rest'\nconsole.log(${name})\n`)
    const { outputFiles } = await esbuild.build({
      entryPoints: [entry], bundle: true, minify: true, format: 'esm', platform: 'browser',
      write: false, logLevel: 'error', absWorkingDir: consumer,
    })
    const bytes = outputFiles[0].contents.length
    const label = `bundle with ${name} only: ${bytes} bytes, ${gzipSync(outputFiles[0].contents).length} gzipped`
    if (name !== 'BXRestFrame') console.log(`[check:package] info: ${label}`)
    else if (bytes <= FRAME_SIZE_LIMIT) ok(`${label} (limit ${FRAME_SIZE_LIMIT})`)
    else fail(`${label}, limit ${FRAME_SIZE_LIMIT}. Something keeps the whole package in the bundle: a static initializer, a decorator or a top-level call.`)
  }
} catch (error) {
  fail(error instanceof Error ? error.message : String(error))
} finally {
  if (keep) console.log(`[check:package] kept ${consumer}`)
  else rmSync(consumer, { recursive: true, force: true })
}

if (failures.length) {
  console.error(`\n[check:package] ${failures.length} check(s) failed`)
  process.exit(1)
}
console.log('\n[check:package] all checks passed')

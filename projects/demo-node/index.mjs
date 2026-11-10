// @ts-check
// Демо bx-rest для Node.js: несколько порталов в одном процессе, повтор при
// лимите частоты, очередь запросов, таймаут и обработка ошибок.
//
//   npm run mock                         — со встроенной заглушкой портала
//   BX_WEBHOOK_A=<адрес вебхука> npm start — с настоящим порталом
//
// На настоящем портале демо только читает: server.time, user.current,
// crm.deal.list. Ничего не создаёт и не меняет.
import { firstValueFrom } from 'rxjs'
import { BXRestApiError, BXRestNavvy, BXRestTimeoutError, isBXRestAnswerSuccess } from 'bx-rest'
import { startMockPortal } from './mock-portal.mjs'

const locale = (process.env.LC_ALL || process.env.LANG || Intl.DateTimeFormat().resolvedOptions().locale || '').toLowerCase()
const ru = locale.startsWith('ru')
/**
 * @typedef {{
 *   title: string, modeMock: string, modeReal: string, usage: string,
 *   s1: string, user: string, deals: string, s2: string, s3: string, s4: string, s5: string,
 *   requests: (n: number) => string,
 *   succeeded: (ok: number, all: number, ms: number) => string,
 *   retried: (n: number) => string, noRetryNeeded: string, spread: (ms: number) => string,
 *   expectedError: string, scopeHint: string, summary: string, ok: string, failed: string,
 * }} Texts
 */
/** @type {Texts} */
const t = ru
  ? {
    title: 'bx-rest — демо для Node.js',
    modeMock: 'Режим: заглушка портала (npm run mock)',
    modeReal: 'Режим: настоящий портал',
    usage: [
      'Укажите адрес входящего вебхука портала:',
      '',
      '  BX_WEBHOOK_A=https://<портал>.bitrix24.ru/rest/1/<секрет>/ npm start',
      '',
      'BX_WEBHOOK_B — необязательный второй портал. Без портала: npm run mock',
    ].join('\n'),
    s1: '1. Два портала одновременно: у каждого клиента свои настройки',
    user: 'пользователь', deals: 'сделок',
    s2: '2. retryOnQueryLimit: true — повтор при QUERY_LIMIT_EXCEEDED',
    s3: '3. throttle: true — не больше 2 запросов в секунду',
    s4: '4. timeout: 1 — запрос дольше 1 мс отменяется',
    s5: '5. Ошибка Bitrix приходит как BXRestApiError',
    requests: n => `${n} запросов`,
    succeeded: (ok, all, ms) => `успешно ${ok} из ${all} за ${ms} мс`,
    retried: n => `ответов 503, которые повторила библиотека: ${n}`,
    noRetryNeeded: 'портал не ответил 503 — повторять было нечего',
    spread: ms => `первый и последний запрос разделяют ${ms} мс`,
    expectedError: 'ожидалась ошибка, а запрос прошёл',
    scopeHint: 'Проверьте права вебхука: нужны user и crm.',
    summary: 'Итог',
    ok: 'ок', failed: 'ошибка',
  }
  : {
    title: 'bx-rest — Node.js demo',
    modeMock: 'Mode: mock portal (npm run mock)',
    modeReal: 'Mode: real portal',
    usage: [
      'Set the incoming webhook address of your portal:',
      '',
      '  BX_WEBHOOK_A=https://<portal>.bitrix24.com/rest/1/<secret>/ npm start',
      '',
      'BX_WEBHOOK_B is an optional second portal. Without a portal: npm run mock',
    ].join('\n'),
    s1: '1. Two portals at once: each client has its own settings',
    user: 'user', deals: 'deals',
    s2: '2. retryOnQueryLimit: true — retry on QUERY_LIMIT_EXCEEDED',
    s3: '3. throttle: true — at most 2 requests per second',
    s4: '4. timeout: 1 — a request longer than 1 ms is aborted',
    s5: '5. A Bitrix error comes as BXRestApiError',
    requests: n => `${n} requests`,
    succeeded: (ok, all, ms) => `${ok} of ${all} succeeded in ${ms} ms`,
    retried: n => `503 answers the library retried: ${n}`,
    noRetryNeeded: 'the portal did not answer 503, nothing to retry',
    spread: ms => `${ms} ms between the first and the last request`,
    expectedError: 'an error was expected, but the request succeeded',
    scopeHint: 'Check the webhook permissions: user and crm are needed.',
    summary: 'Summary',
    ok: 'ok', failed: 'failed',
  }

// ---------- Порталы ----------

const mock = process.argv.includes('--mock')
/** @type {{ name: string, url: string }[]} */
let portals
/** @type {(() => Promise<unknown>)[]} */
const cleanup = []
if (mock) {
  const a = await startMockPortal('A', 120)
  const b = await startMockPortal('B', 75)
  cleanup.push(a.close, b.close)
  portals = [{ name: 'A', url: a.url }, { name: 'B', url: b.url }]
} else {
  const a = process.env.BX_WEBHOOK_A
  const b = process.env.BX_WEBHOOK_B
  if (!a) {
    console.log(`${t.title}\n\n${t.usage}`)
    process.exit(1)
  }
  portals = [{ name: 'A', url: a }, ...(b ? [{ name: 'B', url: b }] : [])]
}
const portalA = portals[0]
const portalB = portals[1] ?? portals[0]

/**
 * Настройки клиента для входящего вебхука: секрет уже в адресе, поэтому
 * авторизацию библиотека не добавляет (`auth.source: 'off'`).
 * @param {string} url адрес вебхука
 * @param {Partial<import('bx-rest').iBXRestSettings>} [extra]
 * @returns {import('bx-rest').iBXRestSettings}
 */
const webhook = (url, extra = {}) => ({
  auth: { source: 'off', key: 'auth' },
  urls: { source: 'string', key: url, additional_part: '' },
  ...extra,
})

// ---------- Вывод ----------

/**
 * Логирует каждую попытку запроса: время от начала сценария, метод, статус.
 * Адрес (`config.url`) целиком не выводится: в нём секрет вебхука.
 * @param {{ started: number, failed503: number }} stats
 * @returns {import('bx-rest').BXRestMiddleware}
 */
const logRequests = stats => async (config, next) => {
  const method = config.url.split('?')[0].split('/').pop()
  const at = () => `+${((Date.now() - stats.started) / 1000).toFixed(2)} s`
  try {
    const data = await next(config)
    console.log(`     ${at()}  ${method}  200`)
    return data
  } catch (error) {
    const response = /** @type {any} */ (error)?.response
    if (response?.status === 503) stats.failed503++
    console.log(`     ${at()}  ${method}  ${response?.status ?? '—'} ${response?.data?.error ?? /** @type {any} */ (error)?.name ?? ''}`)
    throw error
  }
}

/**
 * Короткое описание ошибки без `cause.config`: там адрес с секретом вебхука
 * и тело запроса с токеном.
 * @param {unknown} error
 */
function describe(error) {
  if (error instanceof BXRestApiError) {
    return `BXRestApiError ${error.status ?? ''} ${error.error}: ${error.error_description}`.replace('  ', ' ')
  }
  const cause = /** @type {any} */ (error)?.cause
  if (cause instanceof BXRestTimeoutError || error instanceof BXRestTimeoutError) {
    const timeout = /** @type {BXRestTimeoutError} */ (cause instanceof BXRestTimeoutError ? cause : error)
    return `${timeout.name}: ${timeout.message}`
  }
  return error instanceof Error ? `${error.name}: ${error.message}` : String(error)
}

/** @type {{ title: string, ok: boolean }[]} */
const results = []
/**
 * @param {string} title
 * @param {() => Promise<void>} run
 */
async function scenario(title, run) {
  console.log(`\n${title}`)
  try {
    await run()
    results.push({ title, ok: true })
  } catch (error) {
    console.log(`   ✗ ${describe(error)}`)
    results.push({ title, ok: false })
  }
}

// ---------- Сценарии ----------

console.log(t.title)
console.log(mock ? t.modeMock : t.modeReal)

await scenario(t.s1, async () => {
  // Два клиента с разными настройками работают одновременно. BXRestSettings
  // (глобальные настройки) не нужны и не затрагиваются.
  const lines = await Promise.all(portals.map(async portal => {
    const client = new BXRestNavvy(webhook(portal.url))
    const [user, answer] = await Promise.all([
      firstValueFrom(client.user.current().res()),
      firstValueFrom(client.crm.deal.list({ select: ['ID', 'TITLE'], filter: {}, start: 0 }).resVanilla()),
    ])
    const total = answer && isBXRestAnswerSuccess(answer) ? answer.total ?? answer.result?.length : '?'
    return `   ${portal.name}: ${t.user} «${[user?.NAME, user?.LAST_NAME].filter(Boolean).join(' ')}», ${t.deals}: ${total}`
  })).catch(error => {
    if (!mock) console.log(`   ${t.scopeHint}`)
    throw error
  })
  lines.forEach(line => console.log(line))
})

await scenario(t.s2, async () => {
  const stats = { started: Date.now(), failed503: 0 }
  const client = new BXRestNavvy(webhook(portalA.url, {
    retryOnQueryLimit: true,          // 3 попытки, пауза 1000 мс, потом 2000 мс
    middleware: [logRequests(stats)], // видит каждую попытку
  }))
  console.log(`   ${t.requests(12)}:`)
  const times = await Promise.all(Array.from({ length: 12 }, () => firstValueFrom(client.server.time().res())))
  console.log(`   ${t.succeeded(times.filter(Boolean).length, 12, Date.now() - stats.started)}`)
  console.log(`   ${stats.failed503 ? t.retried(stats.failed503) : t.noRetryNeeded}`)
})

await scenario(t.s3, async () => {
  const stats = { started: Date.now(), failed503: 0 }
  const client = new BXRestNavvy(webhook(portalB.url, {
    throttle: true,                   // 2 запроса в секунду на этого клиента
    middleware: [logRequests(stats)],
  }))
  console.log(`   ${t.requests(6)}:`)
  await Promise.all(Array.from({ length: 6 }, () => firstValueFrom(client.server.time().res())))
  console.log(`   ${t.spread(Date.now() - stats.started)}`)
})

await scenario(t.s4, async () => {
  const client = new BXRestNavvy(webhook(portalA.url, { timeout: 1 }))
  try {
    await firstValueFrom(client.server.time().res())
  } catch (error) {
    // В .res() ошибка таймаута лежит в cause, в .resVanilla() приходит сама
    console.log(`   ✓ ${describe(error)}`)
    return
  }
  throw new Error(t.expectedError)
})

await scenario(t.s5, async () => {
  const client = new BXRestNavvy(webhook(portalA.url, { retryOnQueryLimit: true }))
  try {
    await firstValueFrom(client.Navvy.simple(['bx_rest_demo', 'missing']).res())
  } catch (error) {
    if (!(error instanceof BXRestApiError)) throw error
    console.log(`   ✓ ${describe(error)}`)
    console.log(`     status: ${error.status}, error: ${error.error}, method: ${error.method}`)
    return
  }
  throw new Error(t.expectedError)
})

console.log(`\n${t.summary}:`)
for (const { title, ok } of results) {
  console.log(`   ${ok ? '✓' : '✗'} ${title.replace(/^\d+\. /, '')} — ${ok ? t.ok : t.failed}`)
}
await Promise.all(cleanup.map(close => close()))
process.exit(results.every(r => r.ok) ? 0 : 1)

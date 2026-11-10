// Заглушка портала Bitrix24 для `npm run mock`: отвечает как входящий вебхук
// на несколько методов, чтобы демо работало без настоящего портала.
//
// Как настоящий портал, она:
// - отвечает с задержкой 20–60 мс;
// - ограничивает частоту запросов: до 10 подряд, дальше 2 в секунду, сверх
//   этого — 503 QUERY_LIMIT_EXCEEDED (на настоящем портале запас больше);
// - на неизвестный метод отвечает 404 ERROR_METHOD_NOT_FOUND.
import { createServer } from 'node:http'
import { randomBytes } from 'node:crypto'

const BUCKET = 10
const LEAK_PER_SECOND = 2

const pad = (/** @type {number} */ n) => String(n).padStart(2, '0')
/** Время в формате портала: `YYYY-MM-DDThh:mm:ss+00:00`. */
const portalTime = (d = new Date()) =>
  `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T` +
  `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}+00:00`

/**
 * Страница сделок, как у crm.deal.list: до 50 штук начиная со `start`.
 * @param {string} portal
 * @param {number} start
 * @param {number} total
 */
const deals = (portal, start, total) =>
  Array.from({ length: Math.max(0, Math.min(50, total - start)) }, (_, i) => ({
    ID: String(start + i + 1),
    TITLE: `${portal}: deal ${start + i + 1}`,
    OPPORTUNITY: String((start + i + 1) * 1000),
  }))

/**
 * Запускает заглушку портала. Возвращает адрес входящего вебхука и `close()`.
 * @param {string} name имя портала, попадает в ответы
 * @param {number} dealCount сколько сделок «лежит» на портале
 */
export async function startMockPortal(name, dealCount) {
  const secret = randomBytes(8).toString('hex')
  let level = 0
  let leakedAt = Date.now()

  const server = createServer((req, res) => {
    let raw = ''
    req.on('data', chunk => (raw += chunk))
    req.on('end', () => {
      /** @param {number} status @param {unknown} data */
      const json = (status, data) => {
        res.writeHead(status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
      }
      const answer = () => {
        const match = /^\/rest\/1\/([^/]+)\/([^/?]+)/.exec(req.url ?? '')
        if (!match || match[1] !== secret) {
          return json(401, { error: 'INVALID_CREDENTIALS', error_description: 'Invalid request credentials' })
        }
        // Ограничение частоты: «ведро» на BUCKET запросов, вытекает LEAK_PER_SECOND в секунду
        const now = Date.now()
        level = Math.max(0, level - (now - leakedAt) / 1000 * LEAK_PER_SECOND)
        leakedAt = now
        if (level + 1 > BUCKET) {
          return json(503, { error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests' })
        }
        level += 1

        /** @type {{ start?: number | string }} */
        let body = {}
        try { body = raw ? JSON.parse(raw) : {} } catch { /* не JSON */ }
        switch (match[2].toLowerCase()) {
          case 'server.time':
            return json(200, { result: portalTime() })
          case 'user.current':
            return json(200, {
              result: {
                ID: '1', NAME: 'Demo', LAST_NAME: `User ${name}`, ACTIVE: true, IS_ONLINE: 'Y',
                DATE_REGISTER: '2026-01-15T10:00:00+03:00', PERSONAL_BIRTHDAY: '',
              },
            })
          case 'crm.deal.list': {
            const start = Number(body.start ?? 0)
            return json(200, { result: deals(name, start, dealCount), total: dealCount, next: start + 50 < dealCount ? start + 50 : undefined })
          }
          default:
            return json(404, { error: 'ERROR_METHOD_NOT_FOUND', error_description: 'Method not found!' })
        }
      }
      setTimeout(answer, 20 + Math.random() * 40)
    })
  })

  await new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(undefined)))
  const address = /** @type {import('node:net').AddressInfo} */ (server.address())
  return {
    url: `http://127.0.0.1:${address.port}/rest/1/${secret}/`,
    close: () => new Promise(resolve => {
      server.closeAllConnections()
      server.close(() => resolve(undefined))
    }),
  }
}

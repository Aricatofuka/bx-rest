// Только для тестов, в пакет не входит: файл не импортируется из public-api.ts.
//
// Локальный HTTP-сервер вместо портала: тесты пагинации проверяют, какие запросы уходят
// и как склеиваются ответы, поэтому важны настоящие адреса и тела запросов.
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'

export interface StubRequest {
  /** Метод REST без префикса: `im.recent.list`, `batch` */
  method: string
  /** Запрос пришёл на `rest/api/`, то есть в REST v3 */
  v3: boolean
  /** Тело запроса без `auth` */
  body: Record<string, unknown>
}

/** Ответ портала на запрос: тело JSON целиком, например `{ result: [...], total: 120 }`. */
export type StubHandler = (request: StubRequest) => unknown

export interface PortalStub {
  /** Адрес для `urls.key` в настройках клиента */
  url: string
  /** Все запросы в порядке прихода */
  requests: StubRequest[]
  handle(handler: StubHandler): void
  close(): Promise<void>
}

export async function startPortalStub(): Promise<PortalStub> {
  let handler: StubHandler = () => ({ result: [] })
  const requests: StubRequest[] = []

  const server: Server = createServer((req, res) => {
    let raw = ''
    req.on('data', chunk => (raw += chunk))
    req.on('end', () => {
      const path = (req.url ?? '').replace(/^\/rest\//, '')
      const v3 = path.startsWith('api/')
      const body = (raw ? JSON.parse(raw) : {}) as Record<string, unknown>
      delete body['auth']
      const request = { method: v3 ? path.slice(4) : path, v3, body }
      requests.push(request)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(handler(request)))
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
  const { port } = server.address() as AddressInfo

  return {
    url: `http://127.0.0.1:${port}`,
    requests,
    handle: next => (handler = next),
    close: () => new Promise(resolve => server.close(() => resolve())),
  }
}

/** Команды batch-запроса как имя метода и параметры: `im.search.chat.list?OFFSET=10&LIMIT=10` */
export function batchCommands(request: StubRequest): { method: string, params: URLSearchParams }[] {
  return (request.body['cmd'] as string[]).map(cmd => {
    const [method, query] = cmd.split('?')
    return { method, params: new URLSearchParams(query) }
  })
}

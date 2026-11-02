import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom } from 'rxjs'
import { Navvy } from '../navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'

interface Row {
  id: number
}

const rows = (from: number, count: number): Row[] => Array.from({ length: count }, (_, index) => ({ id: from + index }))

// Настоящий локальный HTTP-сервер: отдаёт список так же, как портал — первую страницу на сам метод,
// остальные через batch. Ошибка возникала на форме ответа, поэтому важно пройти весь путь от ответа до результата.
let server: Server
let total = 0
// Ответ на сам метод, если он отличается от обычной страницы.
let answer: unknown

beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = ''
    req.on('data', chunk => (raw += chunk))
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      if (req.url?.includes('batch')) {
        const pages = (JSON.parse(raw) as { cmd: string[] }).cmd.map((_, index) => ({
          items: rows(51 + index * 50, Math.min(50, total - 50 * (index + 1))),
        }))
        res.end(JSON.stringify({ result: { result: pages } }))
        return
      }
      res.end(JSON.stringify(answer ?? { result: { items: rows(1, Math.min(50, total)) }, total }))
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
})

afterAll(() => {
  server.close()
})

describe('NavvyPagNavResultKey', () => {
  beforeEach(() => {
    answer = undefined
    const { port } = server.address() as AddressInfo
    BXRestSettings.update({
      auth: { source: () => 'token', key: 'auth' },
      urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' },
    })
  })

  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
  })

  const list = (map?: (result: { items: Row[] | undefined } | undefined) => Row[] | undefined) =>
    new Navvy().pagNavResultKey<Row, Row, { start?: number }, 'items'>(['crm', 'item', 'list'], {}, 'items', map)

  describe('without its own map', () => {
    it.each([
      [0, 0],
      [3, 3],
      [50, 50],
      [51, 51],
      [120, 120],
    ])('.resAll() returns an array for %i records', async (records, expected) => {
      total = records
      const result = await firstValueFrom(list().resAll())
      expect(result.map(row => row.id)).toEqual(rows(1, expected).map(row => row.id))
    })

    it('.res() returns the first page as an array, not the whole { items } object', async () => {
      total = 120
      const result = await firstValueFrom(list().res())
      expect(result).toEqual(rows(1, 50))
    })

    it('.mapForVanilla() returns the first page as an array in result', async () => {
      total = 120
      const response = await firstValueFrom(list().mapForVanilla())
      expect(response).toMatchObject({ result: rows(1, 50), total: 120 })
    })

    it('.resVanilla() keeps the raw { items } object', async () => {
      total = 3
      const response = await firstValueFrom(list().resVanilla())
      expect(response).toMatchObject({ result: { items: rows(1, 3) }, total: 3 })
    })

    it('a response without the key gives an empty list', async () => {
      answer = { result: [], total: 0 }
      expect(await firstValueFrom(list().res())).toEqual([])
      expect(await firstValueFrom(list().resAll())).toEqual([])
    })
  })

  describe('with its own map', () => {
    const onlyFirst = (result: { items: Row[] | undefined } | undefined) => result?.items?.slice(0, 1)

    it('.res() applies it', async () => {
      total = 3
      expect(await firstValueFrom(list(onlyFirst).res())).toEqual(rows(1, 1))
    })

    it('.resAll() applies it for a single page', async () => {
      total = 3
      expect(await firstValueFrom(list(onlyFirst).resAll())).toEqual(rows(1, 1))
    })

    it('.resAll() applies it to all pages joined', async () => {
      total = 51
      expect(await firstValueFrom(list(onlyFirst).resAll())).toEqual(rows(1, 1))
    })
  })
})

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom } from 'rxjs'
import { Navvy } from '../navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'

interface Row {
  id: number
}

interface Products {
  products?: Row[]
  extra?: string
}

const rows = (from: number, count: number): Row[] => Array.from({ length: Math.max(count, 0) }, (_, index) => ({ id: from + index }))

// Настоящий локальный HTTP-сервер: первая страница на сам метод, остальные через batch,
// как у catalog.product.list: { result: { products: [...] }, total }.
let server: Server
let total = 0
let answer: unknown
let batches = 0

beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = ''
    req.on('data', chunk => (raw += chunk))
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      if (req.url?.includes('batch')) {
        batches++
        const pages = (JSON.parse(raw) as { cmd: string[] }).cmd.map(cmd => {
          const start = Number(/start=(\d+)/.exec(cmd)?.[1])
          return { products: rows(start + 1, Math.min(50, total - start)), extra: `page-${start}` }
        })
        res.end(JSON.stringify({ result: { result: pages, result_error: [] } }))
        return
      }
      res.end(JSON.stringify(answer ?? { result: { products: rows(1, Math.min(50, total)), extra: 'first' }, total }))
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
})

afterAll(() => {
  server.close()
})

beforeEach(() => {
  answer = undefined
  batches = 0
  const { port } = server.address() as AddressInfo
  BXRestSettings.update({
    auth: { source: () => 'token', key: 'auth' },
    urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' },
  })
})

afterEach(() => {
  BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
})

const list = (map?: (result: Products | undefined) => Products | undefined) =>
  new Navvy().pagNavKeyed<Products, Products, { start?: number }>(['catalog', 'product', 'list'], {}, 'products', map)

describe('NavvyPagNavKeyed', () => {
  it('.res() returns the first page as the whole object, as simple() did', async () => {
    total = 120
    expect(await firstValueFrom(list().res())).toEqual({ products: rows(1, 50), extra: 'first' })
  })

  it('.res() gives the same result as simple() for the same answer', async () => {
    total = 120
    const simple = new Navvy().simple<Products, Products, { start?: number }>(['catalog', 'product', 'list'], {})
    expect(await firstValueFrom(list().res())).toEqual(await firstValueFrom(simple.res()))
  })

  it.each([0, 3, 50, 51, 120])('.resAll() joins %i records under the key', async records => {
    total = records
    const result = await firstValueFrom(list().resAll())
    expect(result.products).toEqual(rows(1, records))
  })

  it('.resAll() keeps the other fields of the first page', async () => {
    total = 120
    expect(await firstValueFrom(list().resAll())).toMatchObject({ extra: 'first' })
  })

  it('.resAll() on a single page does not call batch', async () => {
    total = 30
    await firstValueFrom(list().resAll())
    expect(batches).toBe(0)
  })

  it('a response without the key gives an empty list in .resAll()', async () => {
    answer = { result: {}, total: 0 }
    expect(await firstValueFrom(list().resAll())).toEqual({ products: [] })
  })

  it('applies its own map to .res() and to all pages joined in .resAll()', async () => {
    total = 120
    const count = (result: Products | undefined) => ({ extra: String(result?.products?.length) })
    expect(await firstValueFrom(list(count).res())).toEqual({ extra: '50' })
    expect(await firstValueFrom(list(count).resAll())).toEqual({ extra: '120' })
  })
})

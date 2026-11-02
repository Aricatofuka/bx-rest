import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom, Observable } from 'rxjs'
import { Navvy } from '../navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'

interface Row {
  id: number
}

interface Case {
  name: string
  request(): { res(): Observable<unknown>, mapForVanilla(): Observable<unknown>, resAll(): Observable<unknown> }
  /** Страница в той форме, в которой её отдаёт портал. */
  page(rows: Row[]): unknown
}

const rows = (from: number, count: number): Row[] => Array.from({ length: count }, (_, index) => ({ id: from + index }))

const cases: Case[] = [
  {
    name: 'pagNavTasks',
    request: () => new Navvy().pagNavTasks<Row, Row, { start?: number }>(['tasks', 'task', 'list'], {}),
    page: list => ({ tasks: list }),
  },
  {
    name: 'pagNavResultKeyObject',
    request: () => new Navvy().pagNavResultKeyObject<Row, Row, { start?: number }, 'templates'>(
      ['crm', 'documentgenerator', 'template', 'list'], {}, 'templates'
    ),
    page: list => ({ templates: Object.fromEntries(list.map(row => [row.id, row])) }),
  },
]

// Настоящий локальный HTTP-сервер: первая страница на сам метод, остальные через batch.
let server: Server
let total = 0
let page: Case['page']

beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = ''
    req.on('data', chunk => (raw += chunk))
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      if (req.url?.includes('batch')) {
        const pages = (JSON.parse(raw) as { cmd: string[] }).cmd.map(cmd => {
          const start = Number(/start=(\d+)/.exec(cmd)?.[1])
          return page(rows(start + 1, Math.min(50, total - start)))
        })
        res.end(JSON.stringify({ result: { result: pages } }))
        return
      }
      res.end(JSON.stringify({ result: page(rows(1, Math.min(50, total))), total }))
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
})

afterAll(() => {
  server.close()
})

describe.each(cases)('$name without its own map', ({ request, page: casePage }) => {
  beforeEach(() => {
    page = casePage
    const { port } = server.address() as AddressInfo
    BXRestSettings.update({
      auth: { source: () => 'token', key: 'auth' },
      urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' },
    })
  })

  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
  })

  it('.res() returns the first page as an array', async () => {
    total = 120
    expect(await firstValueFrom(request().res())).toEqual(rows(1, 50))
  })

  it('.mapForVanilla() returns the first page as an array in result', async () => {
    total = 120
    expect(await firstValueFrom(request().mapForVanilla())).toMatchObject({ result: rows(1, 50), total: 120 })
  })

  it.each([0, 3, 50, 51, 120])('.resAll() returns an array for %i records', async records => {
    total = records
    expect(await firstValueFrom(request().resAll())).toEqual(rows(1, records))
  })

  it('a response without the key gives an empty list', async () => {
    total = 0
    page = () => []
    expect(await firstValueFrom(request().res())).toEqual([])
    expect(await firstValueFrom(request().resAll())).toEqual([])
  })
})

describe('own map', () => {
  beforeEach(() => {
    total = 3
    const { port } = server.address() as AddressInfo
    BXRestSettings.update({
      auth: { source: () => 'token', key: 'auth' },
      urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' },
    })
  })

  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
  })

  it('pagNavTasks applies it instead of the default one', async () => {
    page = list => ({ tasks: list })
    const request = () => new Navvy().pagNavTasks<Row, number, { start?: number }>(
      ['tasks', 'task', 'list'], {}, result => result?.tasks?.map(row => row.id)
    )
    expect(await firstValueFrom(request().res())).toEqual([1, 2, 3])
    expect(await firstValueFrom(request().resAll())).toEqual([1, 2, 3])
  })

  it('pagNavResultKeyObject applies it instead of the default one', async () => {
    page = list => ({ templates: Object.fromEntries(list.map(row => [row.id, row])) })
    const request = () => new Navvy().pagNavResultKeyObject<Row, string, { start?: number }, 'templates'>(
      ['crm', 'documentgenerator', 'template', 'list'], {}, 'templates', result => Object.keys(result?.templates ?? {})
    )
    expect(await firstValueFrom(request().res())).toEqual(['1', '2', '3'])
    expect(await firstValueFrom(request().resAll())).toEqual(['1', '2', '3'])
  })

  it('pagNavResultKeyObject applies it to all pages joined', async () => {
    total = 120
    page = list => ({ templates: Object.fromEntries(list.map(row => [row.id, row])) })
    const request = new Navvy().pagNavResultKeyObject<Row, number, { start?: number }, 'templates'>(
      ['crm', 'documentgenerator', 'template', 'list'], {}, 'templates',
      result => Object.values(result?.templates ?? {}).map(row => row.id)
    )
    expect(await firstValueFrom(request.resAll())).toEqual(rows(1, 120).map(row => row.id))
  })
})

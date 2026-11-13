import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { firstValueFrom } from 'rxjs'
import { Navvy } from '../navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { BXRestOffsetNav } from './navvy-pag-offset'
import { batchCommands, PortalStub, startPortalStub } from '../../testing/portal-stub'

interface Row {
  id: number
}

const rows = (from: number, count: number): Row[] => Array.from({ length: Math.max(count, 0) }, (_, index) => ({ id: from + index }))
const url = ['im', 'search', 'chat', 'list']
const nav: BXRestOffsetNav = { offset: 'OFFSET', limit: 'LIMIT', pageSize: 10, maxPageSize: 50 }

let portal: PortalStub
let total = 0
/** Больше записей на странице портал не отдаёт, как бы ни был велик `LIMIT`. */
let portalLimit = Infinity
/** Форма страницы: массив или объект, где ключ — идентификатор записи. */
let shape: (list: Row[]) => unknown = list => list

// Страница так, как её отдаёт im.*: `total` всегда, `next` — если есть следующая страница
function page(offset: number, limit: number) {
  const size = Math.min(limit, portalLimit)
  const list = rows(offset + 1, Math.min(size, total - offset))
  return { result: shape(list), total, ...(offset + size < total ? { next: offset + size } : {}) }
}

beforeAll(async () => {
  portal = await startPortalStub()
})

afterAll(() => portal.close())

beforeEach(() => {
  portal.requests.length = 0
  total = 0
  portalLimit = Infinity
  shape = list => list
  BXRestSettings.update({
    auth: { source: () => 'token', key: 'auth' },
    urls: { source: 'string', key: portal.url, additional_part: 'rest' },
  })
  portal.handle(request => {
    if (request.method === 'batch') {
      const pages = batchCommands(request).map(({ params }) => page(Number(params.get('OFFSET')), Number(params.get('LIMIT'))).result)
      return { result: { result: pages, result_error: [] } }
    }
    return page(Number(request.body['OFFSET'] ?? 0), Number(request.body['LIMIT'] ?? 10))
  })
})

afterEach(() => {
  BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
})

const offsetsInBatch = () => portal.requests
  .filter(request => request.method === 'batch')
  .flatMap(request => batchCommands(request).map(({ params }) => Number(params.get('OFFSET'))))

describe('pagNavOffset .resAll()', () => {
  it('joins all pages in order and asks for the rest in one batch', async () => {
    total = 25

    const all = await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, {}, nav).resAll())

    expect(all).toEqual(rows(1, 25))
    expect(portal.requests.map(request => request.method)).toEqual(['im.search.chat.list', 'batch'])
    expect(offsetsInBatch()).toEqual([10, 20])
  })

  it('sets the default page size explicitly on every page', async () => {
    total = 15

    await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, {}, nav).resAll())

    expect(portal.requests[0].body).toEqual({ LIMIT: 10 })
    expect(batchCommands(portal.requests[1])[0].params.get('LIMIT')).toBe('10')
  })

  it('starts from the OFFSET of the request and keeps its LIMIT', async () => {
    total = 100

    const all = await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, { OFFSET: 40, LIMIT: 25 }, nav).resAll())

    expect(all).toEqual(rows(41, 60))
    expect(offsetsInBatch()).toEqual([65, 90])
  })

  it('a LIMIT above the maximum of the method is cut down to it', async () => {
    total = 120

    await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, { LIMIT: 500 }, nav).resAll())

    expect(portal.requests[0].body).toEqual({ LIMIT: 50 })
    expect(offsetsInBatch()).toEqual([50, 100])
  })

  it('steps by next when the portal returns a smaller page than asked', async () => {
    total = 50
    portalLimit = 20

    const all = await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, { LIMIT: 50 }, nav).resAll())

    expect(all).toEqual(rows(1, 50))
    expect(offsetsInBatch()).toEqual([20, 40])
  })

  it('a zero page size in nav gives the first page instead of an endless list of offsets', async () => {
    total = 25

    await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, {}, { ...nav, pageSize: 0 }).resAll())

    expect(portal.requests.map(request => request.method)).toEqual(['im.search.chat.list'])
  })

  it('a single page needs no batch', async () => {
    total = 10

    expect(await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, {}, nav).resAll())).toEqual(rows(1, 10))
    expect(portal.requests).toHaveLength(1)
  })

  it('merges pages keyed by id, as im.search.user.list returns them', async () => {
    total = 15
    shape = list => Object.fromEntries(list.map(row => [String(row.id), row]))

    const all = await firstValueFrom(new Navvy().pagNavOffset<Record<string, Row>, Record<string, Row>, object>(url, {}, nav).resAll())

    expect(Object.keys(all)).toHaveLength(15)
    expect(all['15']).toEqual({ id: 15 })
  })

  it('an empty keyed result comes as an empty array, as from the portal', async () => {
    total = 0
    shape = () => []

    expect(await firstValueFrom(new Navvy().pagNavOffset<Record<string, Row>, Record<string, Row>, object>(url, {}, nav).resAll()))
      .toEqual([])
  })

  it('applies the mapper to the joined list', async () => {
    total = 12

    const ids = await firstValueFrom(new Navvy()
      .pagNavOffset<Row[], number[], object>(url, {}, nav, list => list?.map(row => row.id))
      .resAll())

    expect(ids).toEqual(rows(1, 12).map(row => row.id))
  })

  it('.res() still returns the first page only, with the request as given', async () => {
    total = 25

    expect(await firstValueFrom(new Navvy().pagNavOffset<Row[], Row[], object>(url, {}, nav).res())).toEqual(rows(1, 10))
    expect(portal.requests.map(request => request.body)).toEqual([{}])
  })
})

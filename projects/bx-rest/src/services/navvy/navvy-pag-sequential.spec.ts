import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { firstValueFrom, Observable } from 'rxjs'
import { Navvy } from '../navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { BXRestApiError } from '../../functions/errors'
import { BXRestSequentialNav } from './navvy-pag-sequential'
import { PortalStub, startPortalStub } from '../../testing/portal-stub'

interface Row {
  id: number
}

interface Params {
  page?: number
  size?: number
}

const rows = (from: number, count: number): Row[] => Array.from({ length: Math.max(count, 0) }, (_, index) => ({ id: from + index }))
const url = ['some', 'list']

let portal: PortalStub
let total = 0

/** Номер страницы растёт, пока страница полная. Размер страницы задаётся явно. */
const byPage: BXRestSequentialNav<Params, Row[]> = {
  first: param => ({ ...param, size: param.size ?? 10 }),
  next: (param, result) => (result.length === param.size ? { ...param, page: (param.page ?? 1) + 1 } : undefined),
}

const pageOf = (body: Record<string, unknown>) => {
  const size = Number(body['size'] ?? 10)
  const from = (Number(body['page'] ?? 1) - 1) * size
  return rows(from + 1, Math.min(size, total - from))
}

beforeAll(async () => {
  portal = await startPortalStub()
})

afterAll(() => portal.close())

beforeEach(() => {
  portal.requests.length = 0
  total = 0
  BXRestSettings.update({
    auth: { source: () => 'token', key: 'auth' },
    urls: { source: 'string', key: portal.url, additional_part: 'rest' },
  })
  portal.handle(request => ({ result: pageOf(request.body) }))
})

afterEach(() => {
  BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
})

const failureOf = (source$: Observable<unknown>) =>
  firstValueFrom(source$).then(
    value => { throw new Error(`expected an error, got ${JSON.stringify(value)}`) },
    (error: Error) => error
  )

describe('pagNavSequential .resAll()', () => {
  it('requests pages one by one until next() says the page was the last one', async () => {
    total = 25

    const all = await firstValueFrom(new Navvy().pagNavSequential(url, {}, byPage).resAll())

    expect(all).toEqual(rows(1, 25))
    expect(portal.requests.map(request => request.body)).toEqual([
      { size: 10 },
      { size: 10, page: 2 },
      { size: 10, page: 3 },
    ])
  })

  it('first() changes only the requests of .resAll(), not the parameters of the request object', async () => {
    total = 5
    const param: Params = {}
    const request = new Navvy().pagNavSequential(url, param, byPage)

    await firstValueFrom(request.resAll())
    await firstValueFrom(request.res())

    expect(param).toEqual({})
    expect(portal.requests.map(request => request.body)).toEqual([{ size: 10 }, {}])
  })

  it('collects the lists under keys, takes the other fields from the last page and drops repeats', async () => {
    // Страницы перекрываются на одну запись, как бывает у im.recent.list
    portal.handle(request => {
      const page = Number(request.body['page'] ?? 1)
      return { result: { items: rows(page * 2 - 1 - (page > 1 ? 1 : 0), 2), hasMore: page < 3, page } }
    })
    const nav: BXRestSequentialNav<Params, { items: Row[], hasMore: boolean }> = {
      next: (param, result) => (result.hasMore ? { ...param, page: (param.page ?? 1) + 1 } : undefined),
      keys: ['items'],
      unique: 'id',
    }

    const all = await firstValueFrom(new Navvy().pagNavSequential(url, {}, nav).resAll())

    expect(all).toEqual({ items: rows(1, 5), hasMore: false, page: 3 })
  })

  it('a portal that ignores the page parameter fails instead of looping forever', async () => {
    portal.handle(() => ({ result: rows(1, 10) }))

    const err = await failureOf(new Navvy().pagNavSequential(url, {}, byPage).resAll())

    expect(err.message).toBe('Bitrix24 returned the same page of some.list twice: the method ignores the pagination parameter, .resAll() stopped.')
    expect(portal.requests).toHaveLength(2)
  })

  it('an error on a later page fails the whole request instead of giving a partial list', async () => {
    total = 30
    portal.handle(request => (request.body['page'] === 2
      ? { error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests' }
      : { result: pageOf(request.body) }))

    const err = await failureOf(new Navvy().pagNavSequential(url, {}, byPage).resAll())

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'QUERY_LIMIT_EXCEEDED', method: 'some.list' })
    expect(portal.requests).toHaveLength(2)
  })

  it('applies the mapper to the joined result', async () => {
    total = 15

    const ids = await firstValueFrom(new Navvy()
      .pagNavSequential<Row[], number[], Params>(url, {}, byPage, list => list?.map(row => row.id))
      .resAll())

    expect(ids).toEqual(rows(1, 15).map(row => row.id))
  })

  it('pagNavSequentialV3 sends its requests to rest/api/', async () => {
    total = 3

    await firstValueFrom(new Navvy().pagNavSequentialV3(url, {}, byPage).resAll())

    expect(portal.requests.map(request => request.v3)).toEqual([true])
  })
})

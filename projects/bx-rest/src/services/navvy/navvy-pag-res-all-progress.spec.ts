import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { firstValueFrom, Observable, Subscription, toArray } from 'rxjs'
import { Navvy } from '../navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { BXRestApiError } from '../../functions/errors'
import { batchCommands, PortalStub, StubRequest, startPortalStub } from '../../testing/portal-stub'
import { BXRestResAllEvent, BXRestResAllProgress } from './res-all-event'
import { BXRestSequentialNav } from './navvy-pag-sequential'

interface Row {
  id: number
}

const PAGE = 50
const rows = (from: number, count: number): Row[] => Array.from({ length: Math.max(count, 0) }, (_, index) => ({ id: from + index }))
const keyed = (list: Row[]) => Object.fromEntries(list.map(row => [`f${row.id}`, row]))
const url = ['crm', 'deal', 'list']

interface Case {
  name: string
  request(): { resAll(): Observable<unknown>, resAllWithProgress(): Observable<BXRestResAllEvent<unknown>> }
  /** Страница в той форме, в которой её отдаёт портал. */
  page(list: Row[]): unknown
  /** С какой записи начинается страница из команды batch. */
  offset(params: URLSearchParams): number
  /** Записи из результата `.resAll()` или из `items`, чтобы сравнить их массивом. */
  records(result: unknown): unknown
}

const byStart = (params: URLSearchParams) => Number(params.get('start'))
const asIs = (result: unknown) => result

const cases: Case[] = [
  { name: 'pagNav', request: () => new Navvy().pagNav(url, {}), page: list => list, offset: byStart, records: asIs },
  { name: 'pagNavTasks', request: () => new Navvy().pagNavTasks(url, {}), page: list => ({ tasks: list }), offset: byStart, records: asIs },
  {
    name: 'pagNavResultKey',
    request: () => new Navvy().pagNavResultKey(url, {}, 'items'),
    page: list => ({ items: list }),
    offset: byStart,
    records: asIs,
  },
  {
    name: 'pagNavResultKeyObject',
    request: () => new Navvy().pagNavResultKeyObject(url, {}, 'items'),
    page: list => ({ items: keyed(list) }),
    offset: byStart,
    records: asIs,
  },
  {
    name: 'pagNavWithUselessKey',
    request: () => new Navvy().pagNavWithUselessKey<Row, Row, { start?: number }>(url, {}, result => Object.values(result ?? {})),
    page: keyed,
    offset: byStart,
    records: asIs,
  },
  {
    name: 'alterPagNav',
    request: () => new Navvy().alterPagNav(url, {}),
    page: list => list,
    offset: params => (Number(params.get('PARAMS[NAV_PARAMS][iNumPage]')) - 1) * PAGE,
    records: asIs,
  },
  {
    name: 'pagNavKeyed',
    request: () => new Navvy().pagNavKeyed<{ items?: Row[] }, { items?: Row[] }, { start?: number }>(url, {}, 'items'),
    page: list => ({ items: list, other: 'field' }),
    offset: byStart,
    records: result => (result as { items?: Row[] }).items,
  },
  {
    name: 'pagNavOffset',
    request: () => new Navvy().pagNavOffset(url, {}, { offset: 'OFFSET', limit: 'LIMIT', pageSize: PAGE }),
    page: list => list,
    offset: params => Number(params.get('OFFSET')),
    records: asIs,
  },
]

let portal: PortalStub
let total = 0
let current: Case = cases[0]

// Портал со `start`: первая страница — с `start` из запроса, остальные через batch
const pageAt = (offset: number) => current.page(rows(offset + 1, Math.min(PAGE, total - offset)))

function answer(request: StubRequest): unknown {
  if (request.method === 'batch') {
    return { result: { result: batchCommands(request).map(({ params }) => pageAt(current.offset(params))), result_error: [] } }
  }
  const offset = Number(request.body['start'] ?? 0)
  return { result: pageAt(offset), total, ...(offset + PAGE < total ? { next: offset + PAGE } : {}) }
}

beforeAll(async () => {
  portal = await startPortalStub()
})

afterAll(() => portal.close())

beforeEach(() => {
  portal.requests.length = 0
  total = 0
  current = cases[0]
  portal.handle(answer)
  BXRestSettings.update({
    auth: { source: () => 'token', key: 'auth' },
    urls: { source: 'string', key: portal.url, additional_part: 'rest' },
  })
})

afterEach(() => {
  BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
})

const eventsOf = <R>(source$: Observable<BXRestResAllEvent<R>>) => firstValueFrom(source$.pipe(toArray()))

const progressOf = <R>(events: BXRestResAllEvent<R>[]) =>
  events.filter((event): event is BXRestResAllProgress<R> => event.type === 'progress')

/** События до ошибки и сама ошибка; если поток завершился без ошибки — тест падает. */
function untilError<R>(source$: Observable<BXRestResAllEvent<R>>) {
  const events: BXRestResAllEvent<R>[] = []
  return new Promise<{ events: BXRestResAllEvent<R>[], error: Error }>((resolve, reject) => source$.subscribe({
    next: event => events.push(event),
    error: (error: Error) => resolve({ events, error }),
    complete: () => reject(new Error(`expected an error, got ${JSON.stringify(events)}`)),
  }))
}

const batchSizes = () => portal.requests.filter(request => request.method === 'batch').map(request => (request.body['cmd'] as string[]).length)

describe('.resAllWithProgress() with pages in batches', () => {
  it('a list of one page gives one progress and done, without batch requests', async () => {
    total = 30

    const events = await eventsOf(new Navvy().pagNav(url, {}).resAllWithProgress())

    expect(events).toEqual([
      { type: 'progress', loaded: 30, total: 30, items: rows(1, 30) },
      { type: 'done', result: rows(1, 30) },
    ])
    expect(portal.requests.map(request => request.method)).toEqual(['crm.deal.list'])
  })

  it('gives progress after the first page and after each batch, in the order of the requests', async () => {
    total = 2600 // первая страница, пакет из 50 страниц и пакет из одной

    const events = await eventsOf(new Navvy().pagNav(url, {}).resAllWithProgress())

    expect(events).toEqual([
      { type: 'progress', loaded: 50, total: 2600, items: rows(1, 50) },
      { type: 'progress', loaded: 2550, total: 2600, items: rows(51, 2500) },
      { type: 'progress', loaded: 2600, total: 2600, items: rows(2551, 50) },
      { type: 'done', result: rows(1, 2600) },
    ])
    expect(batchSizes()).toEqual([50, 1])
  })

  it('the mapper gets the records of each response for items and the whole list for the result', async () => {
    total = 120
    const count = (list: Row[] | undefined) => [list?.length ?? 0]

    const events = await eventsOf(new Navvy().pagNav(url, {}, count).resAllWithProgress())

    expect(events).toEqual([
      { type: 'progress', loaded: 50, total: 120, items: [50] },
      { type: 'progress', loaded: 120, total: 120, items: [70] },
      { type: 'done', result: [120] },
    ])
  })

  it('.resAll() does not map each response: the mapper runs once, on the whole list', async () => {
    total = 120
    const count = vi.fn((list: Row[] | undefined) => [list?.length ?? 0])

    expect(await firstValueFrom(new Navvy().pagNav(url, {}, count).resAll())).toEqual([120])
    expect(count).toHaveBeenCalledTimes(1)
  })

  it('total counts the records from the start of the request', async () => {
    total = 120

    const events = await eventsOf(new Navvy().pagNav(url, { start: 50 }).resAllWithProgress())

    expect(progressOf(events).map(({ loaded, total }) => ({ loaded, total }))).toEqual([
      { loaded: 50, total: 70 },
      { loaded: 70, total: 70 },
    ])
  })

  it('every subscription walks the list again', async () => {
    total = 60
    const progress = new Navvy().pagNav(url, {}).resAllWithProgress()

    const first = await eventsOf(progress)
    const second = await eventsOf(progress)

    expect(second).toEqual(first)
    expect(portal.requests).toHaveLength(4)
  })
})

describe.each(cases)('$name .resAllWithProgress()', testCase => {
  beforeEach(() => {
    current = testCase
  })

  it('gives the records of each response and ends with the result of .resAll()', async () => {
    total = 120

    const events = await eventsOf(testCase.request().resAllWithProgress())
    const all = await firstValueFrom(testCase.request().resAll())

    expect(events.map(event => event.type)).toEqual(['progress', 'progress', 'done'])
    expect(progressOf(events).map(({ loaded, total }) => ({ loaded, total }))).toEqual([
      { loaded: 50, total: 120 },
      { loaded: 120, total: 120 },
    ])
    expect(progressOf(events).flatMap(event => testCase.records(event.items))).toEqual(rows(1, 120))
    expect(events[2]).toEqual({ type: 'done', result: all })
  })
})

describe('.resAllWithProgress() with pages one by one', () => {
  interface Params {
    page?: number
    size?: number
  }

  const listUrl = ['some', 'list']
  /** Номер страницы растёт, пока страница полная. */
  const byPage: BXRestSequentialNav<Params, Row[]> = {
    first: param => ({ ...param, size: param.size ?? 10 }),
    next: (param, result) => (result.length === param.size ? { ...param, page: (param.page ?? 1) + 1 } : undefined),
  }
  const pageOf = (body: Record<string, unknown>) => {
    const from = (Number(body['page'] ?? 1) - 1) * 10
    return rows(from + 1, Math.min(10, total - from))
  }

  beforeEach(() => {
    portal.handle(request => ({ result: pageOf(request.body) }))
  })

  it('without total in the answers gives total undefined and progress after each page', async () => {
    total = 25

    const events = await eventsOf(new Navvy().pagNavSequential(listUrl, {}, byPage).resAllWithProgress())

    expect(events).toEqual([
      { type: 'progress', loaded: 10, total: undefined, items: rows(1, 10) },
      { type: 'progress', loaded: 20, total: undefined, items: rows(11, 10) },
      { type: 'progress', loaded: 25, total: undefined, items: rows(21, 5) },
      { type: 'done', result: rows(1, 25) },
    ])
  })

  it('records that .resAll() drops as repeats are neither in items nor in loaded', async () => {
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

    const events = await eventsOf(new Navvy().pagNavSequential(listUrl, {}, nav).resAllWithProgress())

    expect(events).toEqual([
      { type: 'progress', loaded: 2, total: undefined, items: { items: rows(1, 2), hasMore: true, page: 1 } },
      { type: 'progress', loaded: 3, total: undefined, items: { items: rows(3, 1), hasMore: true, page: 2 } },
      { type: 'progress', loaded: 5, total: undefined, items: { items: rows(4, 2), hasMore: false, page: 3 } },
      { type: 'done', result: { items: rows(1, 5), hasMore: false, page: 3 } },
    ])
  })

  it('an error on a later page fails the stream after the progress of the earlier ones', async () => {
    total = 30
    portal.handle(request => (request.body['page'] === 2
      ? { error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests' }
      : { result: pageOf(request.body) }))

    const { events, error } = await untilError(new Navvy().pagNavSequential(listUrl, {}, byPage).resAllWithProgress())

    expect(events).toEqual([{ type: 'progress', loaded: 10, total: undefined, items: rows(1, 10) }])
    expect(error).toBeInstanceOf(BXRestApiError)
    expect(error).toMatchObject({ error: 'QUERY_LIMIT_EXCEEDED', method: 'some.list' })
  })
})

describe('.resAllWithProgress() errors and cancelling', () => {
  it('an error of a page in batch fails the stream after the progress of the first page, without done', async () => {
    total = 150
    portal.handle(request => (request.method === 'batch'
      ? {
        result: {
          result: [rows(51, 50)],
          result_error: { 1: { error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests' } },
        },
      }
      : answer(request)))

    const { events, error } = await untilError(new Navvy().pagNav(url, {}).resAllWithProgress())

    expect(events).toEqual([{ type: 'progress', loaded: 50, total: 150, items: rows(1, 50) }])
    expect(error).toBeInstanceOf(BXRestApiError)
    expect(error).toMatchObject({ error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests', method: 'crm.deal.list' })
  })

  it('an error of the first page fails the stream before any progress', async () => {
    portal.handle(() => ({ error: 'ACCESS_DENIED', error_description: 'No access' }))

    const { events, error } = await untilError(new Navvy().pagNav(url, {}).resAllWithProgress())

    expect(events).toEqual([])
    expect(error).toBeInstanceOf(BXRestApiError)
    expect(error).toMatchObject({ error: 'ACCESS_DENIED', method: 'crm.deal.list' })
  })

  it('unsubscribing on the first progress sends no batch request', async () => {
    total = 2600
    const events: unknown[] = []

    const subscription: Subscription = new Navvy().pagNav(url, {}).resAllWithProgress().subscribe(event => {
      events.push(event)
      subscription.unsubscribe()
    })
    await vi.waitFor(() => expect(events).toHaveLength(1))
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(events).toHaveLength(1)
    expect(portal.requests.map(request => request.method)).toEqual(['crm.deal.list'])
  })

  it('unsubscribing while a batch request is on the way stops the walk', async () => {
    total = 7550 // первая страница и три пакета
    let subscription: Subscription | undefined
    portal.handle(request => {
      if (request.method === 'batch') {
        subscription?.unsubscribe()
      }
      return answer(request)
    })
    const events: BXRestResAllEvent<unknown>[] = []

    subscription = new Navvy().pagNav(url, {}).resAllWithProgress().subscribe(event => events.push(event))
    await vi.waitFor(() => expect(batchSizes()).toHaveLength(1))
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(batchSizes()).toEqual([50])
    expect(events.map(event => event.type)).toEqual(['progress'])
  })
})

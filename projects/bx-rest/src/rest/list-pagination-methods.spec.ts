import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { firstValueFrom, Observable } from 'rxjs'
import { BXRestNavvy } from './navvy'
import { batchCommands, PortalStub, StubRequest, startPortalStub } from '../testing/portal-stub'

// Методы, которые листаются не через `start`. Заглушка портала листает так, как описано
// в документации Bitrix24, и тест проверяет, какие запросы уходят и что собирает `.resAll()`.

interface Row {
  id: number
}

const rows = (from: number, count: number): Row[] => Array.from({ length: Math.max(count, 0) }, (_, index) => ({ id: from + index }))
const ids = (list: unknown) => (list as Row[]).map(row => row.id)

let portal: PortalStub
let bx: BXRestNavvy

beforeAll(async () => {
  portal = await startPortalStub()
  bx = new BXRestNavvy({
    auth: { source: () => 'token', key: 'auth' },
    urls: { source: 'string', key: portal.url, additional_part: 'rest' },
  })
})

afterAll(() => portal.close())

beforeEach(() => {
  portal.requests.length = 0
})

const sent = () => portal.requests.map(({ method, v3, body }) => ({ method, v3, body }))

describe('OFFSET/LIMIT with total: the rest of the pages go in one batch', () => {
  const total = 120
  const user = (id: number) => ({ id, last_activity_date: '2026-03-02T17:45:59+02:00', mobile_last_date: false })
  const page = (offset: number, limit: number) => rows(offset + 1, Math.min(limit, total - offset)).map(row => user(row.id))

  beforeEach(() => {
    portal.handle(request => {
      if (request.method === 'batch') {
        const pages = batchCommands(request).map(({ params }) => page(Number(params.get('OFFSET')), Number(params.get('LIMIT'))))
        return { result: { result: pages, result_error: [] } }
      }
      const offset = Number(request.body['OFFSET'] ?? 0)
      return { result: page(offset, Number(request.body['LIMIT'] ?? 50)), total }
    })
  })

  it('im.dialog.users.list: .resAll() joins the participants and maps their dates', async () => {
    const all = await firstValueFrom(bx.im.dialog.users.list({ DIALOG_ID: 'chat1' }).resAll())

    expect(ids(all)).toEqual(ids(rows(1, 120)))
    expect(all[0].last_activity_date).toBeInstanceOf(Date)
    expect(portal.requests[0].body).toEqual({ DIALOG_ID: 'chat1', LIMIT: 50 })
    expect(batchCommands(portal.requests[1]).map(({ params }) => params.get('OFFSET'))).toEqual(['50', '100'])
  })

  it('im.dialog.users.list: .res() maps the array of participants', async () => {
    const first = await firstValueFrom(bx.im.dialog.users.list({ DIALOG_ID: 'chat1' }).res())

    expect(first).toHaveLength(50)
    expect(first?.[0].last_activity_date).toBeInstanceOf(Date)
  })

  it.each([
    ['im.department.colleagues.list', () => bx.im.department.colleagues.list().resAll()],
    ['im.search.chat.list', () => bx.im.search.chat.list({ FIND: 'a' }).resAll()],
    ['im.search.department.list', () => bx.im.search.department.list({ FIND: 'a' }).resAll()],
  ])('%s: pages of 10 by default', async (method, request) => {
    expect(ids(await firstValueFrom(request()))).toEqual(ids(rows(1, 120)))
    expect(portal.requests[0]).toMatchObject({ method, body: { LIMIT: 10 } })
    expect(batchCommands(portal.requests[1])).toHaveLength(11)
  })
})

describe('sequential pages', () => {
  it('im.recent.list: OFFSET grows by LIMIT while hasMore, repeated chats are dropped', async () => {
    // Портал сворачивает записи в диалоги: страница короче LIMIT, и страницы перекрываются
    portal.handle(request => {
      const offset = Number(request.body['OFFSET'] ?? 0)
      const items = offset === 0 ? rows(1, 40) : rows(40, 30)
      const date = '2026-01-01T00:00:00+00:00'
      return { result: { items: items.map(row => ({ ...row, date_update: date, message: { date } })), hasMore: offset === 0 } }
    })

    const all = await firstValueFrom(bx.im.recent.list({ SKIP_OPENLINES: 'Y' }).resAll())

    expect(ids(all?.items)).toEqual(ids(rows(1, 69)))
    expect(all?.hasMore).toBe(false)
    expect(sent().map(request => request.body)).toEqual([
      { SKIP_OPENLINES: 'Y', LIMIT: 50 },
      { SKIP_OPENLINES: 'Y', LIMIT: 50, OFFSET: 50 },
    ])
  })

  it('imbot.v2.Bot.list: bots and their users from all pages, while hasNextPage', async () => {
    portal.handle(request => {
      const offset = Number(request.body['offset'] ?? 0)
      const bots = rows(offset + 1, offset === 0 ? 50 : 7)
      return { result: { bots, users: bots, hasNextPage: offset === 0 } }
    })

    const all = await firstValueFrom(bx.imBot.v2.bot.list().resAll())

    expect(ids(all?.['bots'])).toEqual(ids(rows(1, 57)))
    expect(ids(all?.['users'])).toEqual(ids(rows(1, 57)))
    expect(all?.['hasNextPage']).toBe(false)
    expect(sent().map(request => request.body)).toEqual([{ limit: 50 }, { limit: 50, offset: 50 }])
  })

  it('sign.b2e.company.provider.list: offset grows until a short page, the limit is capped at 1000', async () => {
    portal.handle(request => ({ result: rows(Number(request.body['offset'] ?? 0) + 1, request.body['offset'] ? 3 : 1000) }))

    const all = await firstValueFrom(bx.sign.b2e.company.provider.list({ companyCrmId: 1, limit: 5000 }).resAll())

    expect(all).toHaveLength(1003)
    expect(sent().map(request => request.body)).toEqual([
      { companyCrmId: 1, limit: 1000 },
      { companyCrmId: 1, limit: 1000, offset: 1000 },
    ])
  })

  it.each([
    ['biconnector.connector.list', () => bx.biConnector.connector.list().resAll()],
    ['biconnector.dataset.list', () => bx.biConnector.dataset.list().resAll()],
    ['biconnector.source.list', () => bx.biConnector.source.list().resAll()],
  ])('%s: page grows until a page shorter than 50', async (method, request) => {
    portal.handle(stub => {
      const page = Number(stub.body['page'] ?? 1)
      return { result: page < 3 ? rows((page - 1) * 50 + 1, 50) : [] }
    })

    expect(await firstValueFrom(request())).toHaveLength(100)
    // Ровно 100 записей: конец списка виден только по пустой третьей странице
    expect(sent()).toEqual([
      { method, v3: false, body: {} },
      { method, v3: false, body: { page: 2 } },
      { method, v3: false, body: { page: 3 } },
    ])
  })
})

describe('REST v3 lists', () => {
  // Страница REST v3 по pagination.page/limit или pagination.offset
  const v3Page = (total: number) => (request: StubRequest) => {
    const pagination = (request.body['pagination'] ?? {}) as { page?: number, limit?: number, offset?: number }
    const limit = pagination.limit ?? 25
    const offset = pagination.page !== undefined ? (pagination.page - 1) * limit : pagination.offset ?? 0
    return { result: { items: rows(offset + 1, Math.min(limit, total - offset)) } }
  }

  it.each<[string, () => Observable<{ items?: unknown }>, number]>([
    ['mail.mailbox.list', () => bx.mail.mailbox.list().resAll(), 25],
    ['mail.message.list', () => bx.mail.message.list().resAll(), 25],
    ['main.eventlog.list', () => bx.eventLog.list().resAll(), 50],
    ['timeman.record.list', () => bx.timeMan.record.list({ filter: {} }).resAll(), 50],
  ])('%s: rest/api/, pagination.page grows until a short page', async (method, request, pageSize) => {
    portal.handle(v3Page(pageSize * 2 + 1))

    const all = await firstValueFrom(request())

    expect(ids(all.items)).toEqual(ids(rows(1, pageSize * 2 + 1)))
    expect(sent().map(({ method, v3, body }) => [method, v3, body['pagination']])).toEqual([
      [method, true, { limit: pageSize }],
      [method, true, { limit: pageSize, page: 2 }],
      [method, true, { limit: pageSize, page: 3 }],
    ])
  })

  it('mail.message.list: an offset without page grows by the limit', async () => {
    portal.handle(v3Page(260))

    const all = await firstValueFrom(bx.mail.message.list({ pagination: { offset: 10, limit: 500 } }).resAll())

    expect(ids(all?.['items'])).toEqual(ids(rows(11, 250)))
    expect(sent().map(request => request.body['pagination'])).toEqual([
      { offset: 10, limit: 200 },
      { offset: 210, limit: 200 },
    ])
  })

  it('note.collection.list: follows nextCursor until it is null', async () => {
    portal.handle(request => {
      const after = (request.body['pagination'] as { afterCursor?: { id: number } }).afterCursor
      const from = (after?.id ?? 0) + 1
      const items = rows(from, from > 100 ? 20 : 50)
      return { result: { items, nextCursor: from > 100 ? null : { position: from + 49, id: from + 49 } } }
    })

    const all = await firstValueFrom(bx.note.collection.list().resAll())

    expect(ids(all?.['items'])).toEqual(ids(rows(1, 120)))
    expect(all?.['nextCursor']).toBeNull()
    expect(sent().map(request => [request.v3, request.body['pagination']])).toEqual([
      [true, { limit: 50 }],
      [true, { limit: 50, afterCursor: { position: 50, id: 50 } }],
      [true, { limit: 50, afterCursor: { position: 100, id: 100 } }],
    ])
  })
})

describe('REST v3 methods outside the lists go to rest/api/ too', () => {
  it.each<[string, () => Observable<unknown>]>([
    ['main.eventlog.get', () => bx.eventLog.get({ id: 1 }).res()],
    ['main.eventlog.tail', () => bx.eventLog.tail({}).res()],
    ['main.eventlog.field.get', () => bx.eventLog.field.get({ name: 'id' }).res()],
    ['main.eventlog.field.list', () => bx.eventLog.field.list().res()],
    ['timeman.record.field.get', () => bx.timeMan.record.field.get({ name: 'id' }).res()],
    ['timeman.record.field.list', () => bx.timeMan.record.field.list().res()],
  ])('%s', async (method, request) => {
    portal.handle(() => ({ result: {} }))

    await firstValueFrom(request())

    expect(sent()).toEqual([expect.objectContaining({ method, v3: true })])
  })
})

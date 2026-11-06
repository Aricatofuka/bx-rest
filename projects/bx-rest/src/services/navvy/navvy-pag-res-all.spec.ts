import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom, Observable, of, Subscription } from 'rxjs'
import { Navvy } from '../navvy'
import { HttpBXServices } from '../http/HttpBX'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { BXRestApiError } from '../../functions/errors'

interface Row {
  id: number
}

const rows = (from: number, count: number): Row[] => Array.from({ length: Math.max(count, 0) }, (_, index) => ({ id: from + index }))
const keyed = (list: Row[]) => Object.fromEntries(list.map(row => [`f${row.id}`, row]))
const url = ['crm', 'deal', 'list']

interface Case {
  name: string
  request(): { resAll(): Observable<unknown> }
  /** Страница в той форме, в которой её отдаёт портал. */
  page(list: Row[]): unknown
  /** С какой записи начинается страница из команды batch. */
  offset(cmd: string): number
}

const byStart = (cmd: string) => Number(/start=(\d+)/.exec(cmd)?.[1])
const byPageNumber = (cmd: string) => (Number(/iNumPage%5D=(\d+)/.exec(cmd)?.[1]) - 1) * 50

const cases: Case[] = [
  { name: 'pagNav', request: () => new Navvy().pagNav(url, {}), page: list => list, offset: byStart },
  { name: 'pagNavTasks', request: () => new Navvy().pagNavTasks(url, {}), page: list => ({ tasks: list }), offset: byStart },
  { name: 'pagNavResultKey', request: () => new Navvy().pagNavResultKey(url, {}, 'items'), page: list => ({ items: list }), offset: byStart },
  { name: 'pagNavResultKeyObject', request: () => new Navvy().pagNavResultKeyObject(url, {}, 'items'), page: list => ({ items: keyed(list) }), offset: byStart },
  {
    name: 'pagNavWithUselessKey',
    request: () => new Navvy().pagNavWithUselessKey<Row, Row, { start?: number }>(url, {}, result => Object.values(result ?? {})),
    page: keyed,
    offset: byStart,
  },
  { name: 'alterPagNav', request: () => new Navvy().alterPagNav(url, {}), page: list => list, offset: byPageNumber },
]

// Настоящий локальный HTTP-сервер: первая страница на сам метод, остальные через batch.
let server: Server
let total = 0
let firstPage: ((records: number) => string) | undefined
let batchAnswer: ((cmd: string[]) => unknown) | undefined
let commands: string[][] = []
let current: Case

beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = ''
    req.on('data', chunk => (raw += chunk))
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      if (req.url?.includes('batch')) {
        const { cmd } = JSON.parse(raw) as { cmd: string[] }
        commands.push(cmd)
        const pages = cmd.map(item => {
          const offset = current.offset(item)
          return current.page(rows(offset + 1, Math.min(50, total - offset)))
        })
        res.end(JSON.stringify(batchAnswer ? batchAnswer(cmd) : { result: { result: pages, result_error: [] } }))
        return
      }
      if (firstPage) {
        res.end(firstPage(total))
        return
      }
      const next = total > 50 ? 50 : undefined
      res.end(JSON.stringify({ result: current.page(rows(1, Math.min(50, total))), total, next }))
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
})

afterAll(() => {
  server.close()
})

beforeEach(() => {
  commands = []
  firstPage = undefined
  batchAnswer = undefined
  current = cases[0]
  const { port } = server.address() as AddressInfo
  BXRestSettings.update({
    auth: { source: () => 'SECRET_TOKEN', key: 'auth' },
    urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' },
  })
})

afterEach(() => {
  BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
  vi.restoreAllMocks()
})

// Ошибка, с которой завершился Observable; если он резолвился — тест падает.
const failureOf = (source$: Observable<unknown>) =>
  firstValueFrom(source$).then(
    value => { throw new Error(`expected an error, got ${JSON.stringify(value)}`) },
    (error: Error) => error
  )

describe.each(cases)('$name .resAll()', testCase => {
  beforeEach(() => {
    current = testCase
  })

  it('joins all pages in order', async () => {
    total = 120
    expect(await firstValueFrom(testCase.request().resAll())).toEqual(rows(1, 120))
  })

  it('does not request a page past the last one', async () => {
    total = 100
    expect(await firstValueFrom(testCase.request().resAll())).toEqual(rows(1, 100))
    expect(commands.flat()).toHaveLength(1)
  })

  it('an error of one page in batch fails the whole request instead of giving a partial list', async () => {
    total = 150
    batchAnswer = () => ({
      result: {
        result: [testCase.page(rows(51, 50))],
        result_error: { 1: { error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests' } },
      },
    })

    const err = await failureOf(testCase.request().resAll())

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests', method: 'crm.deal.list' })
  })

  it('a Bitrix error in the body of the batch answer fails the whole request', async () => {
    total = 150
    batchAnswer = () => ({ error: 'ACCESS_DENIED', error_description: 'No access' })

    const err = await failureOf(testCase.request().resAll())

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'ACCESS_DENIED', method: 'crm.deal.list' })
  })

  it.each([
    ['an HTML page', '<html>login</html>'],
    ['an empty body', ''],
  ])('%s instead of a REST answer fails with a clear error', async (_, body) => {
    firstPage = () => body

    const err = await failureOf(testCase.request().resAll())

    expect(err).not.toBeInstanceOf(TypeError)
    expect(err.message).toBe('Bitrix24 answered crm.deal.list with a body that is not a REST response.')
  })

  it('the same request object gives the same result when run again', async () => {
    total = 60
    const request = testCase.request()

    expect(await firstValueFrom(request.resAll())).toEqual(rows(1, 60))
    expect(await firstValueFrom(request.resAll())).toEqual(rows(1, 60))
  })
})

describe('.resAll() requests', () => {
  it('splits commands into batches of 50', async () => {
    total = 3000
    await firstValueFrom(new Navvy().pagNav(url, {}).resAll())

    expect(commands.map(cmd => cmd.length)).toEqual([50, 9])
  })

  it('pagNav continues from the start of the request, without repeating its page', async () => {
    total = 120
    await firstValueFrom(new Navvy().pagNav(url, { start: 50 }).resAll())

    expect(commands.flat().map(byStart)).toEqual([100])
  })

  it('alterPagNav uses the page size of the request', async () => {
    current = cases[5]
    total = 25
    firstPage = () => JSON.stringify({ result: rows(1, 10), total: 25, next: 10 })
    batchAnswer = cmd => ({ result: { result: cmd.map((_, index) => rows(11 + index * 10, Math.min(10, 15 - index * 10))) } })

    const request = new Navvy().alterPagNav(url, { PARAMS: { NAV_PARAMS: { nPageSize: 10, iNumPage: 1 } } })

    expect(await firstValueFrom(request.resAll())).toEqual(rows(1, 25))
    expect(commands.flat().map(cmd => /iNumPage%5D=(\d+)/.exec(cmd)?.[1])).toEqual(['2', '3'])
    expect(commands.flat().every(cmd => cmd.includes('nPageSize%5D=10'))).toBe(true)
  })

  it('alterPagNav with a zero page size falls back to the default one', async () => {
    current = cases[5]
    total = 60

    const request = new Navvy().alterPagNav(url, { PARAMS: { NAV_PARAMS: { nPageSize: 0, iNumPage: 1 } } })

    expect(await firstValueFrom(request.resAll())).toEqual(rows(1, 60))
    expect(commands.flat()).toHaveLength(1)
  })

  it('pagNavWithUselessKey without its own map gives one object with all pages', async () => {
    current = cases[4]
    total = 60

    const request = new Navvy().pagNavWithUselessKey<Row, Row, { start?: number }>(url, {})

    expect(await firstValueFrom(request.resAll())).toEqual([keyed(rows(1, 60))])
  })

  it('concurrent subscribers of pagNav do not share a result', async () => {
    total = 120
    const stream = new Navvy().pagNav(url, {}).resAll()

    const [a, b] = await Promise.all([firstValueFrom(stream), firstValueFrom(stream)])

    expect(a).toEqual(rows(1, 120))
    expect(b).toEqual(rows(1, 120))
  })

  it('stops requesting pages once nobody is subscribed', async () => {
    current = cases[2]
    total = 50_000 // 20 пакетов
    let batches = 0
    let subscription: Subscription | undefined
    batchAnswer = cmd => {
      batches++
      subscription?.unsubscribe()
      return { result: { result: cmd.map(() => ({ items: [] })) } }
    }

    subscription = new Navvy().pagNavResultKey(url, {}, 'items').resAll().subscribe()
    await vi.waitFor(() => expect(batches).toBe(1))
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(batches).toBe(1)
  })

  it('handles lists too long to pass as function arguments', async () => {
    const records = 130_000
    vi.spyOn(HttpBXServices.prototype, 'post').mockImplementation(((name: string[], params: { cmd: string[] }) => {
      return name[0] === 'batch'
        ? of({ result: { result: params.cmd.map(() => rows(1, 50)) } })
        : of({ result: rows(1, 50), total: records, next: 50 })
    }) as never)

    const result = await firstValueFrom(new Navvy().pagNav<Row, Row, { start?: number }>(url, {}).resAll())

    expect(result).toHaveLength(records)
  })
})

describe('.res() on a body that is not a REST answer', () => {
  const dealGet = () => new Navvy().simple<unknown, unknown, { ID: number }>(['crm', 'deal', 'get'], { ID: 1 })

  it.each([undefined, { throwOnApiError: true }])('an HTML page fails with a clear plain Error (options: %j)', async options => {
    firstPage = () => '<html>login</html>'

    const err = await failureOf(dealGet().res(options))

    expect(err).not.toBeInstanceOf(BXRestApiError)
    expect(err.message).toBe('Bitrix24 answered crm.deal.get with a body that is not a REST response.')
  })

  it('an empty body still resolves with undefined', async () => {
    firstPage = () => ''

    await expect(firstValueFrom(dealGet().res())).resolves.toBeUndefined()
  })

  it('.resVanilla() keeps the raw body', async () => {
    firstPage = () => '<html>login</html>'

    await expect(firstValueFrom(dealGet().resVanilla())).resolves.toBe('<html>login</html>')
  })
})

describe('logging', () => {
  it('a failed request does not write to the console: axios keeps the token in error.config', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    total = 150
    batchAnswer = () => ({ error: 'ACCESS_DENIED', error_description: 'No access' })

    await failureOf(new Navvy().pagNav(url, {}).resAll())
    BXRestSettings.update({ urls: { source: 'string', key: 'http://127.0.0.1:1', additional_part: 'rest' } })
    await failureOf(new Navvy().simple(['crm', 'deal', 'get']).res())

    expect(consoleError).not.toHaveBeenCalled()
  })
})

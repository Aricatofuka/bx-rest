import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom } from 'rxjs'
import axios from 'axios'
import { BXRestNavvy } from '../../rest/navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { iBXRestSettings } from '../../typification/settings'
import { BXRestMiddleware, BXRestRequestConfig, BXRestSend, composeMiddleware } from './transport'
import { builtInMiddleware, BXRestTimeoutError, ThrottleState } from './middleware'
import { BXRestApiError } from '../../functions/errors'
import { HttpBXServices } from './HttpBX'

// Настоящий локальный сервер, поведение задаёт handler
type Handler = (req: IncomingMessage, body: any, res: ServerResponse) => void
interface Seen { method?: string, url: string, body: any, at: number }

const seen: Seen[] = []
const closedEarly: string[] = []
let handler: Handler
const ok: Handler = (req, body, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  if (req.url?.includes('user.current')) {
    return res.end(JSON.stringify({ result: { ID: '7', NAME: 'U', ACTIVE: true, IS_ONLINE: 'Y', DATE_REGISTER: '2026-11-05T10:00:00+03:00', PERSONAL_BIRTHDAY: '' }, time: {} }))
  }
  res.end(JSON.stringify({ result: [{ ID: '1', TITLE: 'deal' }], total: 1, time: {} }))
}
const answer = (status: number, body: object): Handler => (req, _, res) => {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}
const limitThen = (failures: number): Handler => {
  let left = failures
  return (req, body, res) => (left-- > 0)
    ? answer(503, { error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests' })(req, body, res)
    : ok(req, body, res)
}
const server: Server = createServer((req, res) => {
  let raw = ''
  req.on('data', c => (raw += c))
  req.on('end', () => {
    let body: any = raw
    try { body = raw ? JSON.parse(raw) : {} } catch { /* urlencoded */ }
    seen.push({ method: req.method, url: req.url ?? '', body, at: Date.now() })
    res.on('close', () => { if (!res.writableFinished) closedEarly.push(req.url ?? '') })
    handler(req, body, res)
  })
})
let base = ''
beforeAll(async () => {
  await new Promise<void>(r => server.listen(0, '127.0.0.1', () => r()))
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
})
afterAll(() => new Promise(r => server.close(r)))
afterEach(() => {
  BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
  seen.length = 0
  closedEarly.length = 0
  handler = ok
  vi.useRealTimers()
  vi.restoreAllMocks()
})
handler = ok

const TOKEN = 'SECRET-TOKEN-123'
const settings = (extra: Partial<iBXRestSettings> = {}, url = base): iBXRestSettings => ({
  auth: { source: () => TOKEN, key: 'auth' },
  urls: { source: 'string', key: url, additional_part: 'rest' },
  ...extra,
})
const list = { select: ['ID'], filter: {}, start: 0 } as never
const errorOf = (p: Promise<unknown>) => p.then(() => { throw new Error('expected a failure') }, (e: any) => e)

describe('pipeline', () => {
  it('middleware run in order and see the full request; the answer goes back through them', async () => {
    const order: string[] = []
    const configs: BXRestRequestConfig[] = []
    const step = (name: string): BXRestMiddleware => async (config, next) => {
      order.push('>' + name)
      configs.push(config)
      const data = await next(config)
      order.push('<' + name)
      return data
    }
    const bx = new BXRestNavvy(settings({ middleware: [step('a'), step('b')], headers: { 'X-App': '1' } }))

    await firstValueFrom(bx.crm.deal.list(list).res())

    expect(order).toEqual(['>a', '>b', '<b', '<a'])
    expect(configs[0]).toMatchObject({
      method: 'POST',
      url: `${base}/rest/crm.deal.list`,
      data: { select: ['ID'], filter: {}, start: 0, auth: TOKEN },
      headers: { 'X-App': '1', 'Content-Type': 'application/json' },
      withCredentials: false,
    })
    expect(configs[0].signal).toBeInstanceOf(AbortSignal)
  })

  it('global middleware from BXRestSettings work for new BXRestNavvy() and are read at subscribe time', async () => {
    const calls: string[] = []
    BXRestSettings.update(settings())
    const query = new BXRestNavvy().crm.deal.list(list).res()
    BXRestSettings.update({ middleware: [(c, next) => { calls.push(c.url); return next(c) }] })

    await firstValueFrom(query)

    expect(calls).toEqual([`${base}/rest/crm.deal.list`])
  })

  it('middleware of one client do not touch another client', async () => {
    const calls: string[] = []
    const a = new BXRestNavvy(settings({ middleware: [(c, next) => { calls.push('a'); return next(c) }] }))
    const b = new BXRestNavvy(settings())

    await firstValueFrom(a.crm.deal.list(list).res())
    await firstValueFrom(b.crm.deal.list(list).res())

    expect(calls).toEqual(['a'])
    expect(seen).toHaveLength(2)
  })

  it('a middleware that does not call next is the transport', async () => {
    const own: BXRestMiddleware = async () => ({ result: [{ ID: '42', TITLE: 'mock' }], total: 1 })
    const bx = new BXRestNavvy(settings({ middleware: [own] }))

    const deals = await firstValueFrom(bx.crm.deal.list(list).res()) as any[]

    expect(deals[0].ID).toBe(42)
    expect(seen).toHaveLength(0)
  })

  it('a custom transport that rejects with response: { status, data } gives BXRestApiError', async () => {
    const own: BXRestMiddleware = async () => {
      throw Object.assign(new Error('400'), { response: { status: 400, data: { error: 'NOT_FOUND', error_description: 'Not found' } } })
    }
    const bx = new BXRestNavvy(settings({ middleware: [own] }))

    const err = await errorOf(firstValueFrom(bx.crm.deal.get({ ID: 1 } as never).res()))

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'NOT_FOUND', status: 400, method: 'crm.deal.get' })
  })

  it('GET requests go through the same pipeline', async () => {
    const configs: BXRestRequestConfig[] = []
    BXRestSettings.update(settings({ middleware: [(c, next) => { configs.push(c); return next(c) }] }))

    await firstValueFrom(new HttpBXServices().get(['crm', 'deal', 'list']))

    expect(configs).toHaveLength(1)
    expect(configs[0].method).toBe('GET')
    expect(configs[0].url).toBe(`${base}/rest/crm.deal.list?auth=${TOKEN}`)
  })

  it('one axios instance per client, created on the first request', async () => {
    const create = vi.spyOn(axios, 'create')
    const bx = new BXRestNavvy(settings())
    expect(create).not.toHaveBeenCalled()

    for (let i = 0; i < 5; i++) await firstValueFrom(bx.crm.deal.list(list).res())
    await firstValueFrom(bx.user.current().res())
    await firstValueFrom(new BXRestNavvy(settings()).crm.deal.list(list).res())

    expect(create).toHaveBeenCalledTimes(2)
  })
})

describe('unsubscribing', () => {
  it('aborts the HTTP request', async () => {
    handler = () => { /* не отвечаем */ }
    const bx = new BXRestNavvy(settings())
    const sub = bx.crm.deal.list(list).res().subscribe()
    await vi.waitFor(() => expect(seen).toHaveLength(1))

    sub.unsubscribe()

    await vi.waitFor(() => expect(closedEarly).toEqual(['/rest/crm.deal.list']))
  })

  it('a request waiting in the throttle queue is never sent', async () => {
    const bx = new BXRestNavvy(settings({ throttle: { perSecond: 5 } }))
    await firstValueFrom(bx.crm.deal.list(list).res())

    const sub = bx.crm.deal.list(list).res().subscribe()
    sub.unsubscribe()
    await new Promise(r => setTimeout(r, 300))

    expect(seen).toHaveLength(1)
  })

  it('stops the pause before a retry', async () => {
    handler = limitThen(1)
    const bx = new BXRestNavvy(settings({ retryOnQueryLimit: { delay: 100 } }))

    const sub = bx.crm.deal.list(list).res().subscribe()
    await vi.waitFor(() => expect(seen).toHaveLength(1))
    sub.unsubscribe()
    await new Promise(r => setTimeout(r, 250))

    expect(seen).toHaveLength(1)
  })
})

describe('retryOnQueryLimit, timeout and throttle from settings', () => {
  it('retryOnQueryLimit retries and returns the result', async () => {
    handler = limitThen(2)
    const bx = new BXRestNavvy(settings({ retryOnQueryLimit: { attempts: 3, delay: 20 } }))

    const deals = await firstValueFrom(bx.crm.deal.list(list).res()) as any[]

    expect(deals).toHaveLength(1)
    expect(seen).toHaveLength(3)
    expect(seen[2].at - seen[1].at).toBeGreaterThanOrEqual(seen[1].at - seen[0].at)
  })

  it('retryOnQueryLimit gives up after attempts: the caller gets BXRestApiError QUERY_LIMIT_EXCEEDED', async () => {
    handler = limitThen(5)
    const bx = new BXRestNavvy(settings({ retryOnQueryLimit: { attempts: 2, delay: 10 } }))

    const err = await errorOf(firstValueFrom(bx.crm.deal.list(list).res()))

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'QUERY_LIMIT_EXCEEDED', status: 503 })
    expect(seen).toHaveLength(2)
  })

  it('retryOnQueryLimit does not retry other errors', async () => {
    handler = answer(401, { error: 'ACCESS_DENIED' })
    const bx = new BXRestNavvy(settings({ retryOnQueryLimit: { delay: 10 } }))

    await errorOf(firstValueFrom(bx.crm.deal.list(list).res()))

    expect(seen).toHaveLength(1)
  })

  it('each retry attempt goes through the own middleware', async () => {
    handler = limitThen(1)
    const calls: string[] = []
    const bx = new BXRestNavvy(settings({
      retryOnQueryLimit: { delay: 10 },
      middleware: [(c, next) => { calls.push(c.url); return next(c) }],
    }))

    await firstValueFrom(bx.crm.deal.list(list).res())

    expect(calls).toHaveLength(2)
  })

  it('timeout aborts a slow request: BXRestTimeoutError in .resVanilla(), in cause for .res()', async () => {
    handler = (req, body, res) => setTimeout(() => ok(req, body, res), 500)
    const bx = new BXRestNavvy(settings({ timeout: 50 }))

    const vanilla = await errorOf(firstValueFrom(bx.crm.deal.list(list).resVanilla()))
    const viaRes = await errorOf(firstValueFrom(bx.crm.deal.list(list).res()))

    expect(vanilla).toBeInstanceOf(BXRestTimeoutError)
    expect(vanilla.timeout).toBe(50)
    expect(viaRes.cause).toBeInstanceOf(BXRestTimeoutError)
    await vi.waitFor(() => expect(closedEarly).toHaveLength(2))
  })

  it('timeout does not affect a fast request', async () => {
    const bx = new BXRestNavvy(settings({ timeout: 1000 }))
    await expect(firstValueFrom(bx.crm.deal.list(list).res())).resolves.toHaveLength(1)
  })

  it('throttle spaces requests out', async () => {
    const bx = new BXRestNavvy(settings({ throttle: { perSecond: 20 } }))

    await Promise.all(Array.from({ length: 5 }, () => firstValueFrom(bx.crm.deal.list(list).res())))

    const gaps = seen.slice(1).map((s, i) => s.at - seen[i].at)
    expect(seen).toHaveLength(5)
    expect(seen[4].at - seen[0].at).toBeGreaterThanOrEqual(180)
    expect(Math.min(...gaps)).toBeGreaterThanOrEqual(30)
  })

  it('each client has its own throttle queue', async () => {
    const a = new BXRestNavvy(settings({ throttle: { perSecond: 4 } }))
    const b = new BXRestNavvy(settings({ throttle: { perSecond: 4 } }))

    await Promise.all([
      firstValueFrom(a.crm.deal.list(list).res()),
      firstValueFrom(a.crm.deal.list(list).res()),
      firstValueFrom(b.crm.deal.list(list).res()),
    ])

    const first = seen[0].at
    const late = seen.filter(s => s.at - first >= 200)
    expect(seen).toHaveLength(3)
    expect(late).toHaveLength(1)
  })

  it('global settings are read at subscribe time', async () => {
    handler = limitThen(1)
    BXRestSettings.update(settings())
    const query = new BXRestNavvy().crm.deal.list(list).res()
    BXRestSettings.update({ retryOnQueryLimit: { delay: 10 } })

    await expect(firstValueFrom(query)).resolves.toHaveLength(1)
    expect(seen).toHaveLength(2)
  })

  it('an invalid value fails the request with a TypeError and sends nothing', async () => {
    const bx = new BXRestNavvy(settings({ throttle: { perSecond: 0 } }))

    const err = await errorOf(firstValueFrom(bx.crm.deal.list(list).resVanilla()))

    expect(err).toBeInstanceOf(TypeError)
    expect(err.message).toBe('bx-rest settings: throttle.perSecond must be a number above 0, got 0')
    expect(seen).toHaveLength(0)
  })

  it('without these settings the pipeline is just axios, as before', () => {
    expect(builtInMiddleware(settings(), { throttleNextSlot: 0 })).toEqual([])
    expect(builtInMiddleware(settings({ retryOnQueryLimit: false, timeout: false, throttle: false }), { throttleNextSlot: 0 })).toEqual([])
  })
})

describe('defaults and order (fake timers)', () => {
  const config = (signal?: AbortSignal): BXRestRequestConfig =>
    ({ method: 'POST', url: 'https://portal.test/rest/m', headers: {}, withCredentials: false, signal })
  const run = (own: Partial<iBXRestSettings>, next: BXRestSend, state: ThrottleState = { throttleNextSlot: 0 }, signal?: AbortSignal) =>
    composeMiddleware(builtInMiddleware(settings(own), state), next)(config(signal))
  const limit = { response: { status: 503, data: { error: 'QUERY_LIMIT_EXCEEDED' } } }
  const hang: BXRestSend = c => new Promise((_, reject) => c.signal?.addEventListener('abort', () => reject(c.signal?.reason)))

  it('retryOnQueryLimit: true — 3 attempts, pauses of 1000 and 2000 ms', async () => {
    vi.useFakeTimers()
    const next = vi.fn<BXRestSend>().mockRejectedValue(limit)
    const result = run({ retryOnQueryLimit: true }, next).catch(e => e)

    await vi.advanceTimersByTimeAsync(999)
    expect(next).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)
    expect(next).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(1999)
    expect(next).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(1)
    expect(next).toHaveBeenCalledTimes(3)
    expect(await result).toBe(limit)
  })

  it('retryOnQueryLimit: an object overrides only the given values', async () => {
    vi.useFakeTimers()
    const next = vi.fn<BXRestSend>().mockRejectedValue(limit)
    const result = run({ retryOnQueryLimit: { attempts: 2 } }, next).catch(e => e)

    await vi.advanceTimersByTimeAsync(1000)
    expect(await result).toBe(limit)
    expect(next).toHaveBeenCalledTimes(2)
  })

  it('timeout: true — 60 000 ms, the request is aborted with BXRestTimeoutError', async () => {
    vi.useFakeTimers()
    const next = vi.fn(hang)
    let settled = false
    const result = run({ timeout: true }, next).catch(e => e).finally(() => (settled = true))

    await vi.advanceTimersByTimeAsync(59_999)
    expect(settled).toBe(false)
    await vi.advanceTimersByTimeAsync(1)
    const err = await result
    expect(err).toBeInstanceOf(BXRestTimeoutError)
    expect(err.timeout).toBe(60_000)
    expect(next.mock.calls[0][0].signal?.aborted).toBe(true)
  })

  it('throttle: true — 2 requests per second', async () => {
    vi.useFakeTimers()
    const t0 = Date.now()
    const at: number[] = []
    const next = vi.fn<BXRestSend>(async () => { at.push(Date.now() - t0) })
    const state = { throttleNextSlot: 0 }

    const all = Promise.all([1, 2, 3].map(() => run({ throttle: true }, next, state)))
    await vi.advanceTimersByTimeAsync(1000)
    await all

    expect(at).toEqual([0, 500, 1000])
  })

  it('throttle: a cancelled request gives its place back', async () => {
    vi.useFakeTimers()
    const t0 = Date.now()
    const at: number[] = []
    const next = vi.fn<BXRestSend>(async () => { at.push(Date.now() - t0) })
    const state = { throttleNextSlot: 0 }
    const own = { throttle: { perSecond: 10 } }

    await run(own, next, state)
    const controller = new AbortController()
    const cancelled = run(own, next, state, controller.signal).catch(e => e)
    controller.abort(new Error('unsubscribed'))
    expect((await cancelled).message).toBe('unsubscribed')
    const after = run(own, next, state)
    await vi.advanceTimersByTimeAsync(300)
    await after

    expect(at).toEqual([0, 100])
  })

  it('waiting in the throttle queue does not count towards the timeout', async () => {
    vi.useFakeTimers()
    const next = vi.fn<BXRestSend>(async () => 'ok')
    const state = { throttleNextSlot: 0 }
    const own = { throttle: { perSecond: 1 }, timeout: 300 }

    const results = Promise.all([run(own, next, state), run(own, next, state), run(own, next, state)])
    await vi.advanceTimersByTimeAsync(2000)

    expect(await results).toEqual(['ok', 'ok', 'ok'])
  })

  it('each retry attempt gets its own timeout', async () => {
    vi.useFakeTimers()
    const next = vi.fn<BXRestSend>()
      .mockImplementationOnce(() => new Promise((_, reject) => setTimeout(() => reject(limit), 200)))
      .mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve('ok'), 200)))
    const result = run({ retryOnQueryLimit: { delay: 100 }, timeout: 300 }, next)

    await vi.advanceTimersByTimeAsync(500)

    expect(await result).toBe('ok')
  })

  it('invalid values are rejected with a clear message', () => {
    const check = (own: Partial<iBXRestSettings>) => () => builtInMiddleware(settings(own), { throttleNextSlot: 0 })
    expect(check({ retryOnQueryLimit: { attempts: 0 } })).toThrow('retryOnQueryLimit.attempts must be a whole number from 1, got 0')
    expect(check({ retryOnQueryLimit: { attempts: 1.5 } })).toThrow('retryOnQueryLimit.attempts')
    expect(check({ retryOnQueryLimit: { delay: -1 } })).toThrow('retryOnQueryLimit.delay must be a number of milliseconds from 0, got -1')
    expect(check({ timeout: -5 })).toThrow('timeout must be a number of milliseconds from 1 to 2147483647, got -5')
    expect(check({ timeout: Infinity })).toThrow('timeout')
    expect(check({ timeout: 2 ** 31 })).toThrow('timeout')
    expect(check({ throttle: { perSecond: NaN } })).toThrow('throttle.perSecond')
    expect(check({ retryOnQueryLimit: { delay: 0 }, timeout: 1, throttle: { perSecond: 0.5 } })).not.toThrow()
  })
})

describe('transport errors reach the caller unchanged, as in 1.5.1', () => {
  // Секреты в ошибках не маскируются (решение 2026-11-10): ошибка axios
  // доходит как есть, и обработчики по образцу из документации axios
  // (err.response / err.request) работают как раньше.
  const kindOf = (err: any) => err.response ? 'response' : err.request ? 'no response' : 'setup'

  it('a non-2xx answer: .resVanilla() gives the axios error, .res() keeps it in cause', async () => {
    handler = answer(401, { error: 'expired_token', error_description: 'expired' })
    const bx = new BXRestNavvy(settings())

    const vanilla = await errorOf(firstValueFrom(bx.crm.deal.list(list).resVanilla()))
    const viaRes = await errorOf(firstValueFrom(bx.crm.deal.list(list).res()))

    expect(axios.isAxiosError(vanilla)).toBe(true)
    expect(kindOf(vanilla)).toBe('response')
    expect(vanilla.config.url).toBe(`${base}/rest/crm.deal.list`)
    expect(JSON.parse(vanilla.config.data).auth).toBe(TOKEN)
    expect(viaRes).toBeInstanceOf(BXRestApiError)
    expect(axios.isAxiosError(viaRes.cause)).toBe(true)
    expect(viaRes.cause.response).toMatchObject({ status: 401, data: { error: 'expired_token' } })
  })

  it('a network error keeps err.request, so it is told apart from a setup error', async () => {
    const closed = createServer()
    await new Promise<void>(r => closed.listen(0, '127.0.0.1', () => r()))
    const port = (closed.address() as AddressInfo).port
    await new Promise(r => closed.close(r))
    const bx = new BXRestNavvy(settings({}, `http://127.0.0.1:${port}`))

    const err = await errorOf(firstValueFrom(bx.crm.deal.list(list).resVanilla()))

    expect(err.code).toBe('ECONNREFUSED')
    expect(kindOf(err)).toBe('no response')
  })
})

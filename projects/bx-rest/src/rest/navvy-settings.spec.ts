import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom } from 'rxjs'
import { BXRestNavvy } from './navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../settings'
import { iBXRestSettings } from '../typification/settings'
import { Navvy } from '../services/navvy'
import { NavvyPagBase } from '../services/navvy/extends/navvy-pag-base'
import { HttpServices } from '../services/http/http'
import { HttpBXServices } from '../services/http/HttpBX'
import { SessionKeyServices } from '../services/http/sessionKey'
import { currentContext, globalContext } from '../services/context'

// Клиент со своими настройками: new BXRestNavvy(settings). Каждый «портал» —
// настоящий локальный HTTP-сервер, который запоминает адрес и токен запроса.

interface Seen { url: string, auth?: string }

function portal(name: string) {
  const seen: Seen[] = []
  const total = 120
  const page = (start: number) => Array.from(
    { length: Math.min(50, total - start) },
    (_, i) => ({ ID: String(start + i), TITLE: `${name}-${start + i}` })
  )
  let expiredToken: string | undefined
  const server: Server = createServer((req, res) => {
    let raw = ''
    req.on('data', c => (raw += c))
    req.on('end', () => {
      const body = raw ? JSON.parse(raw) : {}
      seen.push({ url: req.url ?? '', auth: body.auth })
      if (expiredToken && body.auth === expiredToken) {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'expired_token', error_description: 'expired' }))
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      if (req.url?.includes('batch')) {
        const result: Record<string, unknown> = {}
        const totals: Record<string, number> = {}
        for (const [key, cmd] of Object.entries<string>(body.cmd)) {
          result[key] = page(Number(/start=(\d+)/.exec(cmd)?.[1]))
          totals[key] = total
        }
        return res.end(JSON.stringify({
          result: { result, result_error: [], result_total: totals, result_next: {}, result_time: [] },
          time: {}
        }))
      }
      if (req.url?.includes('user.get')) {
        return res.end(JSON.stringify({
          result: [{ ID: '7', NAME: name, ACTIVE: true, DATE_REGISTER: '2026-11-05T10:00:00+03:00', PERSONAL_BIRTHDAY: '' }],
          total: 1
        }))
      }
      res.end(JSON.stringify({ result: page(body.start ?? 0), total, next: 50, time: {} }))
    })
  })
  return {
    seen,
    url: '',
    expire(token: string | undefined) { expiredToken = token },
    async start() {
      await new Promise<void>(r => server.listen(0, '127.0.0.1', () => r()))
      this.url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
    },
    stop() { return new Promise(r => server.close(r)) },
  }
}

function settingsFor(url: string, token: () => string, refresh?: () => Promise<unknown>): iBXRestSettings {
  return {
    auth: { source: token, key: 'auth', ...(refresh ? { refresh } : {}) },
    urls: { source: 'string', key: url, additional_part: 'rest' },
  }
}

// Аргумент-заглушка для обхода методов: любое свойство и вызов дают новую заглушку
function stub(): any {
  const target = function () { /* callable */ }
  return new Proxy(target, {
    get: (_t, k) => (k === Symbol.toPrimitive ? () => 1 : k === Symbol.iterator ? [][Symbol.iterator].bind([]) : k === 'length' ? 0 : stub()),
    apply: () => stub(),
    ownKeys: () => ['prototype'],
    getOwnPropertyDescriptor: (_t, k) => (k === 'prototype' ? { configurable: false, enumerable: false, value: {}, writable: true } : undefined),
    has: () => true,
  })
}

const settingsOf = (http: unknown) => (http as HttpServices | undefined)?.session?.ctx?.settings
const navvySettingsOf = (navvy: Navvy) => (navvy as unknown as { ctx: { settings: iBXRestSettings } }).ctx.settings

const reqList = { select: ['ID', 'TITLE'], filter: {}, start: 0 } as never

const a = portal('A'), b = portal('B'), g = portal('GLOBAL')
beforeAll(async () => { await a.start(); await b.start(); await g.start() })
afterAll(async () => { await a.stop(); await b.stop(); await g.stop() })
afterEach(() => {
  BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
  a.expire(undefined)
  vi.restoreAllMocks()
})

describe('new BXRestNavvy(settings)', () => {
  it('every method and every HTTP object of a client is bound to its settings (full sweep)', () => {
    const own = settingsFor('https://portal-a.test', () => 'A')
    const client = new BXRestNavvy(own)
    new BXRestNavvy() // соседний глобальный клиент ничего не должен перепутать

    const SKIP = new Set(['constructor', 'url'])
    const seen = new Set<object>()
    const wrong: string[] = []
    let queries = 0, httpObjects = 0, navvies = 0

    const walk = (obj: any, path: string) => {
      if (seen.has(obj)) return
      seen.add(obj)
      const names = new Set<string>(Object.getOwnPropertyNames(obj))
      for (let p = Object.getPrototypeOf(obj); p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
        for (const n of Object.getOwnPropertyNames(p)) names.add(n)
      }
      for (const name of names) {
        if (SKIP.has(name)) continue
        let val: any
        try { val = obj[name] } catch { continue }
        const where = `${path}.${name}`
        if (val instanceof HttpServices) {
          httpObjects++
          if (settingsOf(val) !== own) wrong.push(`${where} (http field)`)
          continue
        }
        if (val instanceof Navvy) {
          navvies++
          if (navvySettingsOf(val) !== own) wrong.push(`${where} (Navvy)`)
          continue
        }
        if (typeof val === 'function') {
          try {
            const r = val.call(obj, stub(), stub(), stub())
            if (r instanceof NavvyPagBase) {
              queries++
              if (settingsOf((r as any).http) !== own) wrong.push(`${where}()`)
            }
          } catch { /* часть методов не принимает заглушки — как и в снимке методов */ }
        } else if (val && typeof val === 'object' && !Array.isArray(val) && Object.getPrototypeOf(val) !== Object.prototype) {
          walk(val, where)
        }
      }
    }
    walk(client, 'client')

    expect(queries).toBeGreaterThan(1400)
    expect(navvies).toBeGreaterThan(100)
    expect(httpObjects).toBeGreaterThan(0)
    expect(wrong).toEqual([])
    expect(currentContext()).toBe(globalContext)
  })

  it('two clients and the global one at once: each request goes to its own portal with its own token', async () => {
    BXRestSettings.update(settingsFor(g.url, () => 'G'))
    const clientA = new BXRestNavvy(settingsFor(a.url, () => 'A'))
    const clientB = new BXRestNavvy(settingsFor(b.url, () => 'B'))
    const global = new BXRestNavvy()
    a.seen.length = 0; b.seen.length = 0; g.seen.length = 0

    const [ra, rb, rg] = await Promise.all([
      firstValueFrom(clientA.crm.deal.list(reqList).resAll()),
      firstValueFrom(clientB.crm.deal.list(reqList).resAll()),
      firstValueFrom(global.crm.deal.list(reqList).resAll()),
    ]) as any[]

    expect(ra[0].TITLE).toBe('A-0')
    expect(rb[0].TITLE).toBe('B-0')
    expect(rg[0].TITLE).toBe('GLOBAL-0')
    expect(ra).toHaveLength(120)
    expect(new Set(a.seen.map(s => s.auth))).toEqual(new Set(['A']))
    expect(new Set(b.seen.map(s => s.auth))).toEqual(new Set(['B']))
    expect(new Set(g.seen.map(s => s.auth))).toEqual(new Set(['G']))
  })

  it('output is the same through global settings and through own settings', async () => {
    BXRestSettings.update(settingsFor(a.url, () => 'A'))
    const viaGlobal = new BXRestNavvy()
    const viaOwn = new BXRestNavvy(settingsFor(a.url, () => 'A'))

    const run = async (bx: BXRestNavvy) => ({
      dealRes: await firstValueFrom(bx.crm.deal.list(reqList).res()),
      dealAll: await firstValueFrom(bx.crm.deal.list(reqList).resAll()),
      dealVanilla: await firstValueFrom(bx.crm.deal.list(reqList).resVanilla()),
      dealMapped: await firstValueFrom(bx.crm.deal.list(reqList).mapForVanilla()),
      user: await firstValueFrom(bx.user.get({} as never).res()),
    })
    const left = await run(viaGlobal)
    const right = await run(viaOwn)

    expect(JSON.stringify(right)).toBe(JSON.stringify(left))
    expect((left.user as any)[0].PERSONAL_BIRTHDAY).toBeUndefined()
  })

  it('the global client still reads BXRestSettings at subscribe time', async () => {
    BXRestSettings.update(settingsFor(a.url, () => 'A'))
    const query = new BXRestNavvy().crm.deal.list(reqList).res()
    BXRestSettings.update(settingsFor(g.url, () => 'LATE'))
    g.seen.length = 0

    await firstValueFrom(query)

    expect(g.seen[0]?.auth).toBe('LATE')
  })

  it('a client with own settings ignores later BXRestSettings.update()', async () => {
    const client = new BXRestNavvy(settingsFor(a.url, () => 'A'))
    const query = client.crm.deal.list(reqList).res()
    BXRestSettings.update(settingsFor(g.url, () => 'G'))
    a.seen.length = 0; g.seen.length = 0

    await firstValueFrom(query)
    await firstValueFrom(client.crm.deal.list(reqList).res())

    expect(a.seen.map(s => s.auth)).toEqual(['A', 'A'])
    expect(g.seen).toEqual([])
  })

  it('the token of an existing client changes through the source function, also for an already created query', async () => {
    let token = 'T1'
    const client = new BXRestNavvy(settingsFor(a.url, () => token))
    const createdBefore = client.crm.deal.list(reqList).res()
    a.seen.length = 0

    token = 'T2'
    await firstValueFrom(createdBefore)
    await firstValueFrom(client.crm.deal.list(reqList).res())

    expect(a.seen.map(s => s.auth)).toEqual(['T2', 'T2'])
  })

  it('token refresh is isolated per client', async () => {
    let tokenA = 'A-old'
    const refreshA = vi.fn(async () => { tokenA = 'A-new' })
    const refreshB = vi.fn(async () => undefined)
    a.expire('A-old')
    const clientA = new BXRestNavvy(settingsFor(a.url, () => tokenA, refreshA))
    const clientB = new BXRestNavvy(settingsFor(b.url, () => 'B', refreshB))

    await Promise.all([
      firstValueFrom(clientA.crm.deal.list(reqList).res()),
      firstValueFrom(clientA.crm.lead.list(reqList).res()),
      firstValueFrom(clientB.crm.deal.list(reqList).res()),
    ])

    expect(refreshA).toHaveBeenCalledTimes(1)
    expect(refreshB).not.toHaveBeenCalled()
  })

  describe('a section fails while the client is being created', () => {
    function expectGlobalAfterFailure() {
      expect(currentContext()).toBe(globalContext)
      // Следующий клиент без настроек и объекты, созданные приложением
      // напрямую, работают с глобальными настройками, а не с упавшим клиентом
      expect(settingsOf((new BXRestNavvy().crm.deal.list(reqList) as any).http)).toBe(BXRestSettings.value)
      expect(navvySettingsOf(new Navvy())).toBe(BXRestSettings.value)
      expect(settingsOf(new HttpBXServices())).toBe(BXRestSettings.value)
    }

    it('a nested constructor throws: the error reaches the caller, the next clients use global settings', () => {
      BXRestSettings.update(settingsFor(g.url, () => 'G'))
      vi.spyOn(SessionKeyServices.prototype, 'getAuth').mockImplementationOnce(() => {
        throw new Error('nested section failed')
      })

      expect(() => new BXRestNavvy(settingsFor(a.url, () => 'A'))).toThrow('nested section failed')

      expectGlobalAfterFailure()
    })

    it('settings without auth make a nested constructor throw: the next clients use global settings', () => {
      BXRestSettings.update(settingsFor(g.url, () => 'G'))
      const broken = { urls: { source: 'string', key: a.url, additional_part: 'rest' } } as unknown as iBXRestSettings

      expect(() => new BXRestNavvy(broken)).toThrow(TypeError)

      expectGlobalAfterFailure()
    })

    it('a request of the next global client goes to the global portal', async () => {
      BXRestSettings.update(settingsFor(g.url, () => 'G'))
      vi.spyOn(SessionKeyServices.prototype, 'getAuth').mockImplementationOnce(() => {
        throw new Error('nested section failed')
      })
      expect(() => new BXRestNavvy(settingsFor(a.url, () => 'A'))).toThrow()
      a.seen.length = 0; g.seen.length = 0

      await firstValueFrom(new BXRestNavvy().crm.deal.list(reqList).res())
      await firstValueFrom(new Navvy().simple(['crm', 'deal', 'list'], reqList).res())

      expect(g.seen.map(s => s.auth)).toEqual(['G', 'G'])
      expect(a.seen).toEqual([])
    })
  })

  it('objects created by the application directly keep using global settings', () => {
    new BXRestNavvy(settingsFor(a.url, () => 'A'))

    expect(navvySettingsOf(new Navvy())).toBe(BXRestSettings.value)
    expect(settingsOf(new HttpBXServices())).toBe(BXRestSettings.value)
  })
})

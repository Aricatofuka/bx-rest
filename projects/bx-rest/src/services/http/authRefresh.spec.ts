import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import { createServer, IncomingHttpHeaders, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import axios from 'axios'
import { firstValueFrom, Observable } from 'rxjs'
import { Navvy } from '../navvy'
import { HttpBXServices } from './HttpBX'
import { BXRest } from '../../rest/base'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { BXRestApiError, getAuthRefreshError } from '../../functions/errors'
import { isBXRestAuthError } from './authRefresh'

// Настоящий локальный HTTP-сервер, как в navvy-pag-base.spec.ts: повтор
// срабатывает на ошибку, которую axios сам создаёт на ответ 4xx/5xx.
interface Received { method?: string, url?: string, headers: IncomingHttpHeaders, body: any }
interface Reply { status: number, body?: unknown }

let server: Server
let respond: (req: Received) => Reply
let received: Received[] = []

beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = ''
    req.on('data', chunk => raw += chunk)
    req.on('end', () => {
      const request: Received = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: raw ? JSON.parse(raw) : undefined
      }
      received.push(request)
      const { status, body } = respond(request)
      if (body === undefined) {
        res.writeHead(status)
        res.end()
        return
      }
      const isJson = typeof body !== 'string'
      res.writeHead(status, { 'Content-Type': isJson ? 'application/json' : 'text/html' })
      res.end(isJson ? JSON.stringify(body) : body)
    })
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
})

afterAll(() => {
  server.close()
})

const EXPIRED: Reply = { status: 401, body: { error: 'expired_token', error_description: 'The access token provided has expired.' } }
const OK: Reply = { status: 200, body: { result: { ID: '1' } } }

// Ошибка, с которой завершился Observable; если он резолвился — тест падает.
const failureOf = (source$: Observable<unknown>) =>
  firstValueFrom(source$).then(
    value => { throw new Error(`expected an error, got ${JSON.stringify(value)}`) },
    (error: any) => error
  )

const dealGet = () => new Navvy().simple<unknown, unknown, { ID: number }>(['crm', 'deal', 'get'], { ID: 1 })

describe('auth.refresh: direct portal mode', () => {
  let token: string
  let refresh: Mock<() => Promise<void>>

  beforeEach(() => {
    const { port } = server.address() as AddressInfo
    token = 'old'
    refresh = vi.fn(async () => {
      token = 'new'
    })
    BXRestSettings.update({
      auth: { source: () => token, key: 'auth', refresh },
      urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' }
    })
    received = []
    // Истёкший токен портал не принимает, новый — принимает
    respond = req => (req.body?.auth ?? new URL(req.url ?? '', 'http://x').searchParams.get('auth')) === 'new' ? OK : EXPIRED
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
    vi.restoreAllMocks()
  })

  it('refreshes and retries once with the new token, the caller sees only the result', async () => {
    await expect(firstValueFrom(dealGet().res())).resolves.toEqual({ ID: '1' })

    expect(refresh).toHaveBeenCalledTimes(1)
    expect(received.map(r => r.body.auth)).toEqual(['old', 'new'])
  })

  const requests: [string, () => Observable<unknown>][] = [
    ['.res()', () => dealGet().res()],
    ['.resVanilla()', () => dealGet().resVanilla()],
    ['.mapForVanilla()', () => dealGet().mapForVanilla()],
    ['BXRestRequest.post()', () => new HttpBXServices().post(['crm', 'deal', 'get'], { ID: 1 })],
    ['BXRestRequest.get()', () => new HttpBXServices().get(['crm', 'deal', 'get'], { ID: 1 })],
    ['BXRest.batch()', () => new BXRest().batch({ halt: 0, cmd: { deal: 'crm.deal.get?ID=1' } })],
  ]
  for (const [name, request] of requests) {
    it(`${name} is retried after the refresh`, async () => {
      await firstValueFrom(request())

      expect(refresh).toHaveBeenCalledTimes(1)
      expect(received).toHaveLength(2)
      expect(received[0].url).toBe(received[1].url?.replace('auth=new', 'auth=old'))
    })
  }

  it('retries only once: a second auth error goes out, refresh is not called again', async () => {
    respond = () => EXPIRED

    const err = await failureOf(dealGet().res())

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'expired_token', status: 401 })
    expect(refresh).toHaveBeenCalledTimes(1)
    expect(received).toHaveLength(2)
  })

  it('five requests failing at once share one refresh, and all five are retried', async () => {
    let finishRefresh!: () => void
    refresh.mockImplementation(() => new Promise<void>(resolve => {
      finishRefresh = () => {
        token = 'new'
        resolve()
      }
    }))

    const results = Promise.all([1, 2, 3, 4, 5].map(() => firstValueFrom(dealGet().res())))
    // Ждём, пока упадут все пять — до этого продление не завершаем
    await vi.waitFor(() => expect(received).toHaveLength(5))
    await vi.waitFor(() => expect(refresh).toHaveBeenCalled())
    finishRefresh()

    await expect(results).resolves.toEqual([1, 2, 3, 4, 5].map(() => ({ ID: '1' })))
    expect(refresh).toHaveBeenCalledTimes(1)
    expect(received.map(r => r.body.auth)).toEqual([...Array(5).fill('old'), ...Array(5).fill('new')])
  })

  it('a request sent before a finished refresh and failed after it retries without another refresh', async () => {
    let releaseSlow!: () => void
    const slowReplied = new Promise<void>(resolve => releaseSlow = resolve)
    const http = new HttpBXServices()
    // Ответ на первый запрос "висит" на клиенте, пока второй успевает упасть,
    // продлить токен и повториться
    const realPost = (http as any).axiosInstance.post.bind((http as any).axiosInstance)
    vi.spyOn((http as any).axiosInstance, 'post').mockImplementationOnce(async (...args: unknown[]) => {
      const settled = realPost(...args).then(
        (response: unknown) => () => response,
        (error: unknown) => () => { throw error }
      )
      await slowReplied
      return (await settled)()
    })

    const slow = firstValueFrom(http.post(['crm', 'deal', 'get'], { ID: 1 }))
    await vi.waitFor(() => expect(received).toHaveLength(1))
    await firstValueFrom(dealGet().res())
    releaseSlow()

    await expect(slow).resolves.toEqual(OK.body)
    expect(refresh).toHaveBeenCalledTimes(1)
  })

  const notAuthErrors: [string, Reply][] = [
    ['400 Not found', { status: 400, body: { error: '', error_description: 'Not found' } }],
    ['401 insufficient_scope', { status: 401, body: { error: 'insufficient_scope', error_description: 'The request requires higher privileges' } }],
    ['401 user_access_error', { status: 401, body: { error: 'user_access_error', error_description: 'The user does not have access to the application.' } }],
    ['401 ACCESS_DENIED', { status: 401, body: { error: 'ACCESS_DENIED', error_description: 'REST is available only on commercial plans.' } }],
    ['503 QUERY_LIMIT_EXCEEDED', { status: 503, body: { error: 'QUERY_LIMIT_EXCEEDED', error_description: 'Too many requests' } }],
    ['502 HTML page', { status: 502, body: '<html>502 Bad Gateway</html>' }],
  ]
  for (const [name, reply] of notAuthErrors) {
    it(`${name} is not an auth error: no refresh, no retry`, async () => {
      respond = () => reply

      const err = await failureOf(dealGet().res())

      expect(err).toBeInstanceOf(Error)
      expect(getAuthRefreshError(err)).toBeUndefined()
      expect(refresh).not.toHaveBeenCalled()
      expect(received).toHaveLength(1)
    })
  }

  it('a failed refresh: .res() fails with the original error, the refresh failure is in authRefreshError', async () => {
    const refreshFailure = new Error('portal did not answer')
    refresh.mockRejectedValue(refreshFailure)

    const err = await failureOf(dealGet().res())

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'expired_token', status: 401, authRefreshError: refreshFailure })
    expect(getAuthRefreshError(err)).toBe(refreshFailure)
    expect(received).toHaveLength(1)
  })

  it('a failed refresh: .resVanilla() fails with the original AxiosError, the refresh failure is in authRefreshError', async () => {
    const refreshFailure = new Error('portal did not answer')
    refresh.mockRejectedValue(refreshFailure)

    const err = await failureOf(dealGet().resVanilla())

    expect(axios.isAxiosError(err)).toBe(true)
    expect(err.response.status).toBe(401)
    expect(getAuthRefreshError(err)).toBe(refreshFailure)
  })

  it('a refresh that throws synchronously counts as a failed refresh', async () => {
    const refreshFailure = new Error('sync failure')
    refresh.mockImplementation(() => {
      throw refreshFailure
    })

    const err = await failureOf(dealGet().res())

    expect(err).toMatchObject({ error: 'expired_token', authRefreshError: refreshFailure })
  })

  it('after a failed refresh the next request tries to refresh again', async () => {
    refresh.mockRejectedValueOnce(new Error('first failure'))

    await failureOf(dealGet().res())
    await expect(firstValueFrom(dealGet().res())).resolves.toEqual({ ID: '1' })

    expect(refresh).toHaveBeenCalledTimes(2)
  })

  it('auth.isAuthError overrides the condition', async () => {
    respond = req => req.body.auth === 'new' ? OK : { status: 403, body: { error: 'CUSTOM_EXPIRED' } }
    const isAuthError = vi.fn((error: unknown) => axios.isAxiosError(error) && error.response?.data?.error === 'CUSTOM_EXPIRED')
    BXRestSettings.update({ auth: { ...BXRestSettings.value.auth, isAuthError } })

    await expect(firstValueFrom(dealGet().res())).resolves.toEqual({ ID: '1' })

    expect(isAuthError).toHaveBeenCalledTimes(1)
    expect(refresh).toHaveBeenCalledTimes(1)
  })

  it('.resAll(): a failed batch request is retried with the same commands and headers', async () => {
    let batchCalls = 0
    respond = req => {
      if (req.url === '/rest/crm.deal.list') {
        return { status: 200, body: { result: [{ ID: '1' }], total: 120 } }
      }
      batchCalls++
      return batchCalls === 1 ? EXPIRED : { status: 200, body: { result: { result: [[{ ID: '51' }], [{ ID: '101' }]] } } }
    }

    const deals = await firstValueFrom(
      new Navvy().pagNav(['crm', 'deal', 'list'], {}).withHeaders({ 'X-Trace': 'local' }).resAll()
    )

    expect(deals).toEqual([{ ID: '1' }, { ID: '51' }, { ID: '101' }])
    expect(refresh).toHaveBeenCalledTimes(1)
    expect(received.map(r => r.url)).toEqual(['/rest/crm.deal.list', '/rest/batch', '/rest/batch'])
    const [, failedBatch, retriedBatch] = received
    expect(retriedBatch.body.cmd).toEqual(failedBatch.body.cmd)
    expect([failedBatch.body.auth, retriedBatch.body.auth]).toEqual(['old', 'new'])
    expect(retriedBatch.headers['x-trace']).toBe('local')
  })
})

describe('auth.refresh: backend proxy mode', () => {
  const APP = 'smart-process-pro'
  let serverHasToken: boolean
  let refresh: Mock<() => Promise<void>>

  beforeEach(() => {
    const { port } = server.address() as AddressInfo
    serverHasToken = false
    refresh = vi.fn(async () => {
      serverHasToken = true
    })
    BXRestSettings.update({
      auth: { source: 'off', key: 'auth', refresh },
      urls: { source: 'string', key: `http://127.0.0.1:${port}/api/bitrix/rest/`, additional_part: '' },
      headers: { 'X-Bitrix-App': APP }
    })
    received = []
    // Прокси без действующего токена отвечает 401 с пустым телом
    respond = () => serverHasToken ? OK : { status: 401 }
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
    vi.restoreAllMocks()
  })

  it('an empty 401 from the proxy is refreshed and retried, with the same headers', async () => {
    await expect(firstValueFrom(dealGet().res())).resolves.toEqual({ ID: '1' })

    expect(refresh).toHaveBeenCalledTimes(1)
    expect(received.map(r => [r.url, r.headers['x-bitrix-app']])).toEqual([
      ['/api/bitrix/rest/crm.deal.get', APP],
      ['/api/bitrix/rest/crm.deal.get', APP],
    ])
  })

  it('the retry re-reads BXRestSettings: headers changed by refresh() are sent', async () => {
    refresh.mockImplementation(async () => {
      serverHasToken = true
      BXRestSettings.update({ headers: { 'X-Bitrix-App': APP, 'X-Refreshed': 'yes' } })
    })

    await firstValueFrom(dealGet().res())

    expect(received.map(r => r.headers['x-refreshed'])).toEqual([undefined, 'yes'])
  })

  it('a failed refresh: .res() keeps the old plain Error, with the status in cause and the reason in authRefreshError', async () => {
    const refreshFailure = new Error('token upload failed: 401')
    refresh.mockRejectedValue(refreshFailure)

    const err = await failureOf(dealGet().res())

    expect(err).not.toBeInstanceOf(BXRestApiError)
    expect(err.message).toContain('status code 401')
    expect(err.cause.response.status).toBe(401)
    expect(getAuthRefreshError(err)).toBe(refreshFailure)
  })
})

describe('without auth.refresh', () => {
  beforeEach(() => {
    const { port } = server.address() as AddressInfo
    BXRestSettings.update({
      auth: { source: () => 'old', key: 'auth' },
      urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' }
    })
    received = []
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
    vi.restoreAllMocks()
  })

  it('expired_token fails right away with BXRestApiError, the request is not repeated', async () => {
    respond = () => EXPIRED

    const err = await failureOf(dealGet().res())

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'expired_token', status: 401, authRefreshError: undefined })
    expect(received).toHaveLength(1)
  })

  it('an empty 401 fails right away with the old plain Error, the request is not repeated', async () => {
    respond = () => ({ status: 401 })

    const err = await failureOf(dealGet().res())

    expect(err).not.toBeInstanceOf(BXRestApiError)
    expect(err.message).toBe('AxiosError: Request failed with status code 401')
    expect(received).toHaveLength(1)
  })
})

describe('isBXRestAuthError', () => {
  const httpError = (status: number, data?: unknown) =>
    new axios.AxiosError('failed', 'ERR_BAD_REQUEST', undefined, undefined, { status, data } as any)

  it('Bitrix expired_token / invalid_token — an auth error, whatever the status', () => {
    expect(isBXRestAuthError(httpError(401, { error: 'expired_token' }))).toBe(true)
    expect(isBXRestAuthError(httpError(401, { error: 'invalid_token' }))).toBe(true)
    expect(isBXRestAuthError(httpError(400, { error: 'expired_token' }))).toBe(true)
  })

  it('a 401 without a Bitrix error body — an auth error (an empty answer of a backend proxy)', () => {
    expect(isBXRestAuthError(httpError(401, ''))).toBe(true)
    expect(isBXRestAuthError(httpError(401, '<html>Unauthorized</html>'))).toBe(true)
  })

  it('a 401 with another Bitrix code is not: a new token does not fix it', () => {
    for (const error of ['insufficient_scope', 'NO_AUTH_FOUND', 'ACCESS_DENIED', 'INVALID_CREDENTIALS', 'user_access_error', 'OVERLOAD_LIMIT']) {
      expect(isBXRestAuthError(httpError(401, { error }))).toBe(false)
    }
  })

  it('neither are other statuses, network errors and non-axios errors', () => {
    expect(isBXRestAuthError(httpError(403, ''))).toBe(false)
    expect(isBXRestAuthError(new axios.AxiosError('Network Error', 'ERR_NETWORK'))).toBe(false)
    expect(isBXRestAuthError(new Error('401'))).toBe(false)
    expect(isBXRestAuthError(undefined)).toBe(false)
  })
})

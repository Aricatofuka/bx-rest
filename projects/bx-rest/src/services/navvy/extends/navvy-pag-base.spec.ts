import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { firstValueFrom, Observable } from 'rxjs'
import { Navvy } from '../../navvy'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../../settings'
import { BXRestApiError } from '../../../functions/errors'

// Настоящий локальный HTTP-сервер, а не мок axios: важна именно та форма
// ошибки, которую axios сам создаёт на ответ 4xx/5xx — на ней и терялись
// код и описание ошибки Bitrix.
let server: Server
let reply: { status: number, body: unknown }

beforeAll(async () => {
  server = createServer((_req, res) => {
    const isJson = typeof reply.body !== 'string'
    res.writeHead(reply.status, { 'Content-Type': isJson ? 'application/json' : 'text/html' })
    res.end(isJson ? JSON.stringify(reply.body) : reply.body)
  })
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()))
})

afterAll(() => {
  server.close()
})

describe('NavvyPagBase.res() error handling', () => {
  beforeEach(() => {
    const { port } = server.address() as AddressInfo
    BXRestSettings.update({
      auth: { source: () => 'token', key: 'auth' },
      urls: { source: 'string', key: `http://127.0.0.1:${port}`, additional_part: 'rest' }
    })
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
    vi.restoreAllMocks()
  })

  const dealGet = () => new Navvy().simple<unknown, unknown, { ID: number }>(['crm', 'deal', 'get'], { ID: 1 })

  // Ошибка, с которой завершился Observable; если он резолвился — тест падает.
  const failureOf = (source$: Observable<unknown>) =>
    firstValueFrom(source$).then(
      value => { throw new Error(`expected an error, got ${JSON.stringify(value)}`) },
      (error: Error) => error
    )

  for (const options of [undefined, { throwOnApiError: true }]) {
    it(`HTTP 400 with a Bitrix body fails with BXRestApiError (options: ${JSON.stringify(options)})`, async () => {
      reply = { status: 400, body: { error: '', error_description: 'Not found' } }

      const err = await failureOf(dealGet().res(options))

      expect(err).toBeInstanceOf(BXRestApiError)
      expect(err).toMatchObject({ error: '', error_description: 'Not found', status: 400, method: 'crm.deal.get' })
      expect(err.message).toBe('Not found')
    })
  }

  it('HTTP 401 expired_token keeps the code and the status', async () => {
    reply = { status: 401, body: { error: 'expired_token', error_description: 'The access token provided has expired.' } }

    const err = await failureOf(dealGet().res())

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'expired_token', status: 401 })
  })

  it('REST v3 error body is read too', async () => {
    reply = { status: 400, body: { error: { code: 'BITRIX_REST_V3_EXCEPTION', message: 'Bad field' } } }

    const err = await failureOf(dealGet().res())

    expect(err).toMatchObject({ error: 'BITRIX_REST_V3_EXCEPTION', error_description: 'Bad field', status: 400 })
  })

  it('HTTP 200 with an error body: resolves undefined by default, fails with throwOnApiError', async () => {
    reply = { status: 200, body: { error: 'INSUFFICIENT_SCOPE', error_description: 'Not enough scope' } }

    await expect(firstValueFrom(dealGet().res())).resolves.toBeUndefined()

    const err = await failureOf(dealGet().res({ throwOnApiError: true }))
    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err).toMatchObject({ error: 'INSUFFICIENT_SCOPE', status: undefined, method: 'crm.deal.get' })
  })

  it('a non-Bitrix error page keeps the old plain Error', async () => {
    reply = { status: 502, body: '<html>502 Bad Gateway</html>' }

    const err = await failureOf(dealGet().res())

    expect(err).not.toBeInstanceOf(BXRestApiError)
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toContain('status code 502')
  })

  it('a success response still resolves with result', async () => {
    reply = { status: 200, body: { result: { ID: '1' } } }

    await expect(firstValueFrom(dealGet().res())).resolves.toEqual({ ID: '1' })
  })
})

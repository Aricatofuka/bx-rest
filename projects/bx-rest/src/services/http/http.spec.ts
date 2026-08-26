import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { firstValueFrom } from 'rxjs'
import { HttpServices } from './http'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { SessionKeyError } from './sessionKey'

// BXRestSettings.date is a module-level singleton (the library's real public
// config surface, see settings.ts) — save/restore it around every test so
// these tests don't leak configuration into other spec files.
describe('HttpServices', () => {
  afterEach(() => {
    BXRestSettings.date = { ...DEFAULT_BX_REST_SETTINGS }
    vi.restoreAllMocks()
  })

  describe('httpPost', () => {
    it('rejects with SessionKeyError when auth is required but no token is available', async () => {
      // Default settings: auth.source = 'cookies'. In a Node test environment
      // there is no `document`, so no cookie can ever be read — this is the
      // real "you forgot to configure auth" scenario a consumer would hit.
      const http = new HttpServices()

      await expect(firstValueFrom(http.httpPost('crm.deal.get'))).rejects.toBeInstanceOf(SessionKeyError)
    })

    it('posts a FormData body and resolves to response.data when auth is off', async () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'auth' } })
      const http = new HttpServices()
      const postSpy = vi
        .spyOn((http as any).axiosInstance, 'post')
        .mockResolvedValue({ data: { result: 'ok' } })

      const result = await firstValueFrom(http.httpPost('crm.deal.get', { ID: 1 }))

      expect(result).toEqual({ result: 'ok' })
      expect(postSpy).toHaveBeenCalledOnce()
      const [url, body] = postSpy.mock.calls[0]
      expect(url).toContain('crm.deal.get')
      expect(body).toBeInstanceOf(FormData)
    })

    it('sessid: serializes flat params into a real x-www-form-urlencoded body', async () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'sessid' } })
      const http = new HttpServices()
      const postSpy = vi
        .spyOn((http as any).axiosInstance, 'post')
        .mockResolvedValue({ data: { result: 'ok' } })

      await firstValueFrom(http.httpPost('crm.deal.get', { ID: 1, TITLE: 'Deal' }))

      const [, body, config] = postSpy.mock.calls[0] as [string, string, any]
      expect(body).toBe('ID=1&TITLE=Deal')
      expect(config.headers['Content-Type']).toBe('application/x-www-form-urlencoded')
    })

    it('sessid: flattens a one-level-nested object as key[subKey]=value', async () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'sessid' } })
      const http = new HttpServices()
      const postSpy = vi
        .spyOn((http as any).axiosInstance, 'post')
        .mockResolvedValue({ data: { result: 'ok' } })

      await firstValueFrom(http.httpPost('crm.deal.update', { fields: { TITLE: 'Deal' } }))

      const [, body] = postSpy.mock.calls[0] as [string, string]
      expect(body).toBe('fields%5BTITLE%5D=Deal')
    })

    it('rejects with SessionKeyError when the base URL cannot be resolved', async () => {
      BXRestSettings.update({
        auth: { source: 'off', key: 'auth' },
        urls: { source: 'string', key: '', additional_part: '' },
      })
      const http = new HttpServices()

      await expect(firstValueFrom(http.httpPost('crm.deal.get'))).rejects.toBeInstanceOf(SessionKeyError)
    })
  })

  describe('httpGet', () => {
    it('rejects with SessionKeyError when auth is required but no token is available', async () => {
      const http = new HttpServices()

      await expect(firstValueFrom(http.httpGet('crm.deal.list'))).rejects.toBeInstanceOf(SessionKeyError)
    })

    it('builds a query string from params and resolves to response.data', async () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'auth' } })
      const http = new HttpServices()
      const getSpy = vi
        .spyOn((http as any).axiosInstance, 'get')
        .mockResolvedValue({ data: { result: ['ok'] } })

      const result = await firstValueFrom(http.httpGet('crm.deal.list', { FILTER: 'active' }))

      expect(result).toEqual({ result: ['ok'] })
      const [url] = getSpy.mock.calls[0]
      expect(url).toContain('crm.deal.list?')
      expect(url).toContain('FILTER=active')
    })
  })
})

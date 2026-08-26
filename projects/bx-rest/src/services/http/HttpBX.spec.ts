import { afterEach, describe, expect, it, vi } from 'vitest'
import { firstValueFrom } from 'rxjs'
import { HttpBXServices } from './HttpBX'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from '../../settings'
import { iBatchRequestAnswer } from '../../typification/rest/batch/batchRequestParam'

describe('HttpBXServices', () => {
  afterEach(() => {
    BXRestSettings.date = { ...DEFAULT_BX_REST_SETTINGS }
    vi.restoreAllMocks()
  })

  describe('getNameMethod', () => {
    it('joins a method name array with "."', () => {
      const http = new HttpBXServices()
      expect(http.getNameMethod(['crm', 'deal', 'get'])).toBe('crm.deal.get')
    })
  })

  describe('prepareBatch', () => {
    it('builds "method?serializedParams" strings for each batch command', () => {
      const http = new HttpBXServices()
      const result = http.prepareBatch({
        deal: { name: 'crm.deal.get', param: { ID: 1 } },
        contact: { name: 'crm.contact.get', param: { ID: 2 } },
      })

      expect(result['deal']).toBe('crm.deal.get?ID=1')
      expect(result['contact']).toBe('crm.contact.get?ID=2')
    })
  })

  describe('mapBranchResult', () => {
    // The method returns Object.assign([], ...) — a real Array instance with
    // extra string-keyed properties tacked on (accessible as result['deal']),
    // not a plain object. vitest's toEqual treats Array vs plain-object as a
    // type mismatch even when the enumerable properties line up, so assert
    // properties directly instead of comparing to an object literal.
    it('merges successful chunks into one object keyed by batch command name', () => {
      const http = new HttpBXServices()
      const chunk1: iBatchRequestAnswer<any> = { result: { result: { deal: { ID: 1 } } } } as any
      const chunk2: iBatchRequestAnswer<any> = { result: { result: { contact: { ID: 2 } } } } as any

      const result = http.mapBranchResult([chunk1, chunk2])

      expect(result['deal']).toEqual({ ID: 1 })
      expect(result['contact']).toEqual({ ID: 2 })
    })

    it('a failed chunk (top-level error) contributes nothing, instead of throwing', () => {
      const http = new HttpBXServices()
      const chunk1: iBatchRequestAnswer<any> = { result: { result: { deal: { ID: 1 } } } } as any
      const failedChunk: iBatchRequestAnswer<any> = { error: 'INSUFFICIENT_SCOPE' } as any

      const result = http.mapBranchResult([chunk1, failedChunk])

      expect(result['deal']).toEqual({ ID: 1 })
      expect(Object.keys(result)).toEqual(['deal'])
    })
  })

  describe('mapBranchResultWithoutKey', () => {
    it('flattens numerically-keyed chunks (array-style batch input) into one flat array', () => {
      const http = new HttpBXServices()
      // Mirrors what prepareBatch produces for an *array* input: keys are the
      // stringified array indices ('0', '1', ...), which Object.assign onto an
      // array target treats as real array elements — see just-flatten-it check.
      const chunk1: iBatchRequestAnswer<any> = { result: { result: { '0': [{ ID: 1 }], '1': [{ ID: 2 }] } } } as any
      const chunk2: iBatchRequestAnswer<any> = { result: { result: { '0': [{ ID: 3 }] } } } as any

      const result = http.mapBranchResultWithoutKey([chunk1, chunk2])

      expect(result).toEqual([{ ID: 3 }, { ID: 2 }])
      // NOTE: chunk2's '0' overwrites chunk1's '0' (Object.assign semantics —
      // later sources win on key collision), so {ID: 1} is lost here. This is
      // expected only when each chunk uses genuinely distinct indices.
    })
  })

  describe('httpPost (Bitrix-specific override)', () => {
    it('sessid: serializes params as a real x-www-form-urlencoded body (unlike the base HttpServices bug)', async () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'sessid' } })
      const http = new HttpBXServices()
      const postSpy = vi
        .spyOn((http as any).axiosInstance, 'post')
        .mockResolvedValue({ data: { result: 'ok' } })

      await firstValueFrom(http.post(['crm', 'deal', 'get'], { ID: 1 }))

      const [, body, config] = postSpy.mock.calls[0] as [string, unknown, any]
      expect(body).toBe('ID=1')
      expect(config.headers['Content-Type']).toBe('application/x-www-form-urlencoded')
    })

    it('non-sessid key: sends params as a JSON body', async () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'auth' } })
      const http = new HttpBXServices()
      const postSpy = vi
        .spyOn((http as any).axiosInstance, 'post')
        .mockResolvedValue({ data: { result: 'ok' } })

      await firstValueFrom(http.post(['crm', 'deal', 'get'], { ID: 1 }))

      const [, body, config] = postSpy.mock.calls[0] as [string, unknown, any]
      expect(body).toEqual({ ID: 1 })
      expect(config.headers['Content-Type']).toBe('application/json')
    })

    it('restApi=true prefixes the method with "api/"', async () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'auth' } })
      const http = new HttpBXServices()
      const postSpy = vi
        .spyOn((http as any).axiosInstance, 'post')
        .mockResolvedValue({ data: { result: 'ok' } })

      await firstValueFrom(http.post(['crm', 'deal', 'get'], {}, true))

      const [url] = postSpy.mock.calls[0]
      expect(url).toContain('api/crm.deal.get')
    })
  })
})

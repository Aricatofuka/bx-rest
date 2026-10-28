import { describe, expect, it } from 'vitest'
import { AxiosError } from 'axios'
import { BXRestApiError, bxRestApiErrorFromHttp, parseBXRestErrorBody } from './errors'

describe('BXRestApiError', () => {
  it('uses error_description as message when provided', () => {
    const err = new BXRestApiError('expired_token', 'The access token has expired')

    expect(err.message).toBe('The access token has expired')
    expect(err.error).toBe('expired_token')
    expect(err.error_description).toBe('The access token has expired')
  })

  it('falls back to error when error_description is missing', () => {
    const err = new BXRestApiError('INSUFFICIENT_SCOPE', undefined)

    expect(err.message).toBe('INSUFFICIENT_SCOPE')
  })

  it('falls back to a default message when both are missing', () => {
    const err = new BXRestApiError(undefined, undefined)

    expect(err.message).toBe('Bitrix API error')
  })

  it('sets name to BXRestApiError and is a real Error instance', () => {
    const err = new BXRestApiError('e', 'd')

    expect(err.name).toBe('BXRestApiError')
    expect(err).toBeInstanceOf(Error)
  })

  it('exposes status, method and cause from details; all optional', () => {
    const cause = new Error('original')
    const err = new BXRestApiError('expired_token', 'expired', { status: 401, method: 'crm.deal.get', cause })

    expect(err.status).toBe(401)
    expect(err.method).toBe('crm.deal.get')
    expect(err.cause).toBe(cause)

    const bare = new BXRestApiError('e', 'd')
    expect(bare.status).toBeUndefined()
    expect(bare.method).toBeUndefined()
    expect(bare.cause).toBeUndefined()
  })
})

describe('parseBXRestErrorBody', () => {
  it('reads a REST v2 error body', () => {
    expect(parseBXRestErrorBody({ error: 'expired_token', error_description: 'The access token has expired' }))
      .toEqual({ error: 'expired_token', error_description: 'The access token has expired' })
  })

  it('treats an empty v2 error code as an error (crm.deal.get "Not found")', () => {
    expect(parseBXRestErrorBody({ error: '', error_description: 'Not found' }))
      .toEqual({ error: '', error_description: 'Not found' })
  })

  it('reads a REST v3 error body', () => {
    expect(parseBXRestErrorBody({ error: { code: 'BITRIX_REST_V3_EXCEPTION', message: 'Bad field', validation: [] } }))
      .toEqual({ error: 'BITRIX_REST_V3_EXCEPTION', error_description: 'Bad field' })
  })

  it('returns undefined for success payloads and non-Bitrix bodies', () => {
    expect(parseBXRestErrorBody({ result: [] })).toBeUndefined()
    expect(parseBXRestErrorBody('<html>502 Bad Gateway</html>')).toBeUndefined()
    expect(parseBXRestErrorBody(undefined)).toBeUndefined()
    expect(parseBXRestErrorBody({ error: 42 })).toBeUndefined()
  })
})

describe('bxRestApiErrorFromHttp', () => {
  const axiosErrorWith = (status: number, data: unknown) =>
    new AxiosError(`Request failed with status code ${status}`, 'ERR_BAD_REQUEST', undefined, undefined, {
      status,
      statusText: '',
      headers: {},
      config: {} as any,
      data
    })

  it('converts an HTTP error with a Bitrix body into BXRestApiError', () => {
    const httpError = axiosErrorWith(401, { error: 'expired_token', error_description: 'The access token has expired' })

    const err = bxRestApiErrorFromHttp(httpError, 'crm.deal.get')

    expect(err).toBeInstanceOf(BXRestApiError)
    expect(err?.error).toBe('expired_token')
    expect(err?.error_description).toBe('The access token has expired')
    expect(err?.status).toBe(401)
    expect(err?.method).toBe('crm.deal.get')
    expect(err?.cause).toBe(httpError)
  })

  it('returns undefined for a network error (no response)', () => {
    expect(bxRestApiErrorFromHttp(new AxiosError('Network Error', 'ERR_NETWORK'), 'crm.deal.get')).toBeUndefined()
  })

  it('returns undefined when the body is not a Bitrix error (e.g. a proxy HTML page)', () => {
    expect(bxRestApiErrorFromHttp(axiosErrorWith(502, '<html>502 Bad Gateway</html>'), 'crm.deal.get')).toBeUndefined()
  })

  it('returns undefined for non-axios errors', () => {
    expect(bxRestApiErrorFromHttp(new Error('boom'), 'crm.deal.get')).toBeUndefined()
  })
})

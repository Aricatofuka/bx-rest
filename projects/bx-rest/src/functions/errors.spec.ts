import { describe, expect, it } from 'vitest'
import { BXRestApiError } from './errors'

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
})

import { afterEach, describe, expect, it } from 'vitest'
import { BXRestSettings, DEFAULT_BX_REST_SETTINGS } from './settings'

describe('BXRestSettings', () => {
  afterEach(() => {
    BXRestSettings.value = { ...DEFAULT_BX_REST_SETTINGS }
  })

  describe('update', () => {
    it('merges a partial update into the current value', () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'auth' } })
      expect(BXRestSettings.value.auth).toEqual({ source: 'off', key: 'auth' })
      expect(BXRestSettings.value.urls).toEqual(DEFAULT_BX_REST_SETTINGS.urls)
    })
  })

  describe('date (deprecated alias for value)', () => {
    it('reading .date returns the current .value', () => {
      BXRestSettings.update({ auth: { source: 'off', key: 'sessid' } })
      expect(BXRestSettings.date).toEqual(BXRestSettings.value)
    })

    it('writing .date updates .value, for code written against the pre-1.0 API', () => {
      const custom = { ...DEFAULT_BX_REST_SETTINGS, auth: { source: 'off' as const, key: 'OAuth2' } }
      BXRestSettings.date = custom
      expect(BXRestSettings.value).toEqual(custom)
    })
  })
})

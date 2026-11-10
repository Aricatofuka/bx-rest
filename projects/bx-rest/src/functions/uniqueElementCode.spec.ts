import { afterEach, describe, expect, it, vi } from 'vitest'
import { uniqueElementCode } from './uniqueElementCode'

describe('uniqueElementCode', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('is bx_rest_ and 128 random bits in hex', () => {
    expect(uniqueElementCode()).toMatch(/^bx_rest_[0-9a-f]{32}$/)
  })

  it('takes the bytes from crypto.getRandomValues', () => {
    const spy = vi.spyOn(globalThis.crypto, 'getRandomValues')

    uniqueElementCode()

    expect(spy).toHaveBeenCalledTimes(1)
    expect((spy.mock.calls[0][0] as Uint8Array).length).toBe(16)
  })

  it('does not repeat', () => {
    const codes = new Set(Array.from({ length: 10_000 }, () => uniqueElementCode()))
    expect(codes.size).toBe(10_000)
  })

  it('works without a global crypto (Node 18)', () => {
    vi.stubGlobal('crypto', undefined)

    const codes = new Set(Array.from({ length: 1000 }, () => uniqueElementCode()))

    expect(codes.size).toBe(1000)
    for (const code of codes) {
      expect(code).toMatch(/^bx_rest_[0-9a-f]{32}$/)
    }
  })
})

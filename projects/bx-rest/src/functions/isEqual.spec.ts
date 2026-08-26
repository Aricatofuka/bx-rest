import { describe, expect, it } from 'vitest'
import { isEqual } from './isEqual'

describe('isEqual', () => {
  it('two Date instances with the same time -> true', () => {
    expect(isEqual(new Date('2024-01-05T09:00:00Z'), new Date('2024-01-05T09:00:00Z'))).toBe(true)
  })

  it('two Date instances with different time -> false', () => {
    expect(isEqual(new Date('2024-01-05T09:00:00Z'), new Date('2024-01-06T09:00:00Z'))).toBe(false)
  })

  it('primitives with the same value -> true', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual('a', 'a')).toBe(true)
  })

  it('primitives with different value -> false', () => {
    expect(isEqual(1, 2)).toBe(false)
  })

  it('one Date and one non-Date -> false (falls back to ===)', () => {
    expect(isEqual(new Date('2024-01-05T09:00:00Z'), '2024-01-05T09:00:00Z')).toBe(false)
  })

  it('plain objects with equal shape but different references -> false (=== semantics)', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(false)
  })
})

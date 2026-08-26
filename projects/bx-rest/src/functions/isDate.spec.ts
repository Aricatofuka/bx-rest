import { describe, expect, it } from 'vitest'
import { isDate } from './isDate'

describe('isDate', () => {
  it('Date instance -> true', () => {
    expect(isDate(new Date())).toBe(true)
  })

  it('invalid Date instance (Invalid Date) -> true, isDate does not check validity', () => {
    expect(isDate(new Date('not-a-date'))).toBe(true)
  })

  it('date-like string -> false', () => {
    expect(isDate('2024-01-01')).toBe(false)
  })

  it('number (timestamp) -> false', () => {
    expect(isDate(Date.now())).toBe(false)
  })

  it('null -> false', () => {
    expect(isDate(null)).toBe(false)
  })

  it('undefined -> false', () => {
    expect(isDate(undefined)).toBe(false)
  })

  it('plain object -> false', () => {
    expect(isDate({})).toBe(false)
  })
})

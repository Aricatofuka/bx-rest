import { describe, expect, it } from 'vitest'
import { isValidDate } from './isValidDate'

describe('isValidDate', () => {
  it('valid Date instance -> true', () => {
    expect(isValidDate(new Date())).toBe(true)
  })

  it('Date instance built from invalid string (Invalid Date) -> false', () => {
    expect(isValidDate(new Date('not-a-date'))).toBe(false)
  })

  it('date-like string (not a Date instance) -> false', () => {
    expect(isValidDate('2024-01-01')).toBe(false)
  })

  it('null -> false', () => {
    expect(isValidDate(null)).toBe(false)
  })

  it('undefined -> false', () => {
    expect(isValidDate(undefined)).toBe(false)
  })
})

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { toLocalAtom } from './toLocalAtom'

describe('toLocalAtom', () => {
  const originalTz = process.env['TZ']

  afterEach(() => {
    process.env['TZ'] = originalTz
  })

  it('formats date/time components with zero-padding, offset +03:00 (Europe/Moscow)', () => {
    process.env['TZ'] = 'Europe/Moscow'
    const date = new Date(2024, 0, 5, 9, 3, 7) // 5 Jan 2024, 09:03:07 local

    expect(toLocalAtom(date)).toBe('2024-01-05T09:03:07+03:00')
  })

  it('uses a negative offset for a timezone behind UTC (America/New_York)', () => {
    process.env['TZ'] = 'America/New_York'
    const date = new Date(2024, 0, 5, 9, 3, 7)

    expect(toLocalAtom(date)).toBe('2024-01-05T09:03:07-05:00')
  })

  it('pads single-digit month, day, hour, minute and second', () => {
    process.env['TZ'] = 'UTC'
    const date = new Date(2024, 0, 1, 1, 2, 3)

    expect(toLocalAtom(date)).toBe('2024-01-01T01:02:03+00:00')
  })
})

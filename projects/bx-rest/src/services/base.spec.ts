import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  cropUrl,
  deriveDateOnlyFormat,
  getBaseUrlHttps,
  prepareBaseAddress,
  toBXYorN,
  toBool,
  toDate,
  ToNumError,
  toISOStringWithTimezone,
  toNum,
  toStr,
} from './base'

describe('toStr', () => {
  it('converts values to their string representation', () => {
    expect(toStr(42)).toBe('42')
    expect(toStr(true)).toBe('true')
  })

  it('null/undefined -> empty string by default', () => {
    expect(toStr(null)).toBe('')
    expect(toStr(undefined)).toBe('')
  })

  it('null/undefined with throwError -> throws', () => {
    expect(() => toStr(null, true)).toThrow()
    expect(() => toStr(undefined, true)).toThrow()
  })
})

describe('toNum', () => {
  it('numeric string -> number', () => {
    expect(toNum('42')).toBe(42)
  })

  it('number passthrough', () => {
    expect(toNum(42)).toBe(42)
  })

  it('invalid value -> throws ToNumError by default', () => {
    expect(() => toNum('not-a-number')).toThrow(ToNumError)
  })

  it('invalid value with throwError=false -> logs and returns defValue (0 by default)', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(toNum('not-a-number', false)).toBe(0)
    expect(spy).toHaveBeenCalledOnce()
    spy.mockRestore()
  })

  it('invalid value with throwError=false and custom defValue', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(toNum('not-a-number', false, -1)).toBe(-1)
    vi.restoreAllMocks()
  })
})

describe('ToNumError', () => {
  it('message includes the offending value and its type', () => {
    const err = new ToNumError('abc')
    expect(err.message).toContain('abc')
    expect(err.message).toContain('string')
    expect(err.name).toBe('ToNumError')
  })

  it('toString() includes the error name and message', () => {
    const err = new ToNumError('abc')
    expect(err.toString()).toContain('ToNumError')
    expect(err.toString()).toContain('abc')
  })
})

describe('deriveDateOnlyFormat', () => {
  it('strips the time part and its separator from a date-time format', () => {
    expect(deriveDateOnlyFormat('dd.MM.yyyy HH:mm:ss')).toBe('dd.MM.yyyy')
  })

  it('strips a letter separator too (ISO-style "T")', () => {
    expect(deriveDateOnlyFormat('dd.MM.yyyyTHH:mm:ss')).toBe('dd.MM.yyyy')
  })

  it('date-only format is returned unchanged', () => {
    expect(deriveDateOnlyFormat('yyyy-MM-dd')).toBe('yyyy-MM-dd')
  })
})

describe('toDate', () => {
  it('Date instance passes through unchanged', () => {
    const date = new Date('2024-01-05T09:00:00.000Z')
    expect(toDate(date)).toBe(date)
  })

  it('number (timestamp) -> new Date(timestamp)', () => {
    expect(toDate(0).getTime()).toBe(0)
  })

  it('string without a format -> native Date parsing', () => {
    expect(toDate('2024-01-05T09:00:00.000Z').toISOString()).toBe('2024-01-05T09:00:00.000Z')
  })

  it('string matching the explicit format is parsed exactly', () => {
    const date = toDate('05.01.2024 09:03:07', 'dd.MM.yyyy HH:mm:ss')
    expect(date.getFullYear()).toBe(2024)
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(5)
    expect(date.getHours()).toBe(9)
    expect(date.getMinutes()).toBe(3)
    expect(date.getSeconds()).toBe(7)
  })

  it('falls back to a known Bitrix format when the explicit format does not match', () => {
    // explicit format is 'dd.MM.yyyy HH:mm:ss', but the value is actually 'yyyy-MM-dd HH:mm:ss'
    const date = toDate('2024-01-05 09:03:07', 'dd.MM.yyyy HH:mm:ss')
    expect(date.getFullYear()).toBe(2024)
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(5)
  })

  it('falls back to positional heuristic when no known format matches', () => {
    const date = toDate('2024/01/05', 'dd.MM.yyyy HH:mm:ss')
    expect(date.getFullYear()).toBe(2024)
    expect(date.getMonth()).toBe(0)
    expect(date.getDate()).toBe(5)
  })

  it('rejects an out-of-range month/day instead of letting Date roll it over', () => {
    // month=13 would silently roll over to January of the next year if not range-checked
    expect(() => toDate('05.13.2024', 'dd.MM.yyyy')).toThrow('Wrong date format')
  })

  it('unparseable string throws by default', () => {
    expect(() => toDate('not-a-date-at-all', 'dd.MM.yyyy')).toThrow('Wrong date format')
  })

  it('unparseable string with throwError=false returns the current date instead of throwing', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15T00:00:00.000Z'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const date = toDate('not-a-date-at-all', 'dd.MM.yyyy', undefined, false)
    expect(date.toISOString()).toBe('2024-06-15T00:00:00.000Z')

    vi.useRealTimers()
    vi.restoreAllMocks()
  })
})

describe('toISOStringWithTimezone', () => {
  const originalTz = process.env['TZ']

  afterEach(() => {
    process.env['TZ'] = originalTz
  })

  it('formats using the local timezone offset', () => {
    process.env['TZ'] = 'Europe/Moscow'
    const date = new Date(2024, 0, 5, 9, 3, 7)
    expect(toISOStringWithTimezone(date)).toBe('2024-01-05T09:03:07+03:00')
  })

  it('non-Date value throws by default', () => {
    expect(() => toISOStringWithTimezone('2024-01-05' as any)).toThrow()
  })

  it('non-Date value with throwError=false returns an empty string', () => {
    expect(toISOStringWithTimezone('2024-01-05' as any, false)).toBe('')
  })
})

describe('toBool', () => {
  it('Bitrix "Y"/"N" strings', () => {
    expect(toBool('Y')).toBe(true)
    expect(toBool('N')).toBe(false)
  })

  it('"true"/"false" strings', () => {
    expect(toBool('true')).toBe(true)
    expect(toBool('false')).toBe(false)
  })

  it('is case-insensitive', () => {
    expect(toBool('y')).toBe(true)
  })

  it('invalid string throws by default', () => {
    expect(() => toBool('maybe')).toThrow()
  })

  it('invalid string with throwError=false returns false', () => {
    expect(toBool('maybe', false)).toBe(false)
  })

  it('non-string values fall back to Boolean(val)', () => {
    expect(toBool(1)).toBe(true)
    expect(toBool(0)).toBe(false)
  })
})

describe('toBXYorN', () => {
  it('true -> "Y", false -> "N"', () => {
    expect(toBXYorN(true)).toBe('Y')
    expect(toBXYorN(false)).toBe('N')
  })
})

describe('cropUrl', () => {
  it('strips the protocol from a URL', () => {
    expect(cropUrl('https://example.bitrix24.ru')).toBe('example.bitrix24.ru')
    expect(cropUrl('http://example.bitrix24.ru')).toBe('example.bitrix24.ru')
  })

  it('no protocol -> unchanged', () => {
    expect(cropUrl('example.bitrix24.ru')).toBe('example.bitrix24.ru')
  })

  it('empty string -> empty string', () => {
    expect(cropUrl('')).toBe('')
  })
})

describe('getBaseUrlHttps', () => {
  it('component=false -> full https URL', () => {
    expect(getBaseUrlHttps('example.bitrix24.ru')).toBe('https://example.bitrix24.ru/')
  })

  it('component=true -> no protocol added', () => {
    expect(getBaseUrlHttps('example.bitrix24.ru', true)).toBe('example.bitrix24.ru/')
  })
})

describe('prepareBaseAddress', () => {
  it('adds a trailing slash when missing', () => {
    expect(prepareBaseAddress('https://example.bitrix24.ru')).toBe('https://example.bitrix24.ru/')
  })

  it('keeps an existing trailing slash as-is', () => {
    expect(prepareBaseAddress('https://example.bitrix24.ru/')).toBe('https://example.bitrix24.ru/')
  })

  it('appends the extra path segment between base and trailing slash', () => {
    expect(prepareBaseAddress('https://example.bitrix24.ru', 'rest')).toBe('https://example.bitrix24.ru/rest/')
  })
})

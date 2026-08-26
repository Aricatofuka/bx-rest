import { afterEach, describe, expect, it, vi } from 'vitest'
import { CatchError, formatError } from './errorHandler'

describe('formatError', () => {
  it('includes message, args, error and stack trace lines', () => {
    const result = formatError({
      message: 'boom',
      args: [1, 'a'],
      error: 'something broke',
      stack: 'Error: something broke\n  at a\n  at b\n  at c',
    })

    expect(result).toContain('boom')
    expect(result).toContain('args: [1,"a"]')
    expect(result).toContain('error: something broke')
    expect(result).toContain('stack trace:')
  })

  it('omits args/error lines when not provided', () => {
    const result = formatError({ message: 'boom' })

    expect(result).not.toContain('args:')
    expect(result).not.toContain('error:')
  })
})

describe('CatchError decorator', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  class Widget {
    @CatchError()
    breakSilently() {
      throw new Error('boom')
    }

    @CatchError({ defaultValue: 'fallback' })
    breakWithDefault() {
      throw new Error('boom')
    }

    @CatchError({ rethrow: true })
    breakAndRethrow() {
      throw new Error('boom')
    }

    ok() {
      return 'fine'
    }
  }

  it('swallows the error and returns undefined by default', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(new Widget().breakSilently()).toBeUndefined()
  })

  it('returns options.defaultValue when provided', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(new Widget().breakWithDefault()).toBe('fallback')
  })

  it('rethrows when options.rethrow is true', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => new Widget().breakAndRethrow()).toThrow('boom')
  })

  it('logs a formatted error to console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    new Widget().breakSilently()

    expect(spy).toHaveBeenCalledOnce()
    expect(spy.mock.calls[0][0]).toContain('Error in Widget.breakSilently')
  })

  it('does not interfere with methods that do not throw', () => {
    expect(new Widget().ok()).toBe('fine')
  })
})

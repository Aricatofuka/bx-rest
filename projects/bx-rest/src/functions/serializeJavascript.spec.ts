import { describe, expect, it } from 'vitest'
import serialize from './serializeJavascript'

describe('serializeJavascript', () => {
  it('plain object -> plain JSON string', () => {
    expect(serialize({ a: 1, b: 'x' })).toBe('{"a":1,"b":"x"}')
  })

  it('undefined -> the literal string "undefined" (protects against JSON.stringify returning undefined)', () => {
    expect(serialize(undefined)).toBe('undefined')
  })

  // NOTE: the code has a dedicated `instanceof Date` branch meant to emit a
  // re-hydratable `new Date(...)` call (see serializeJavascript.ts:87), but it
  // is unreachable in practice: JSON.stringify calls Date.prototype.toJSON()
  // on the value *before* invoking the replacer, so `replacer` only ever sees
  // the already-converted ISO string, never a Date instance. Verified against
  // plain JSON.stringify independent of this codebase. Documenting the actual
  // (likely unintended) behavior here rather than the aspirational one.
  it('Date value -> serialized as a plain ISO string, not "new Date(...)" (dead branch, see note above)', () => {
    const date = new Date('2024-01-05T09:00:00.000Z')
    expect(serialize({ createdAt: date })).toBe(
      '{"createdAt":"2024-01-05T09:00:00.000Z"}'
    )
  })

  it('RegExp value -> re-hydratable "new RegExp(...)" call', () => {
    expect(serialize({ re: /abc/gi })).toBe('{"re":new RegExp("abc", "gi")}')
  })

  it('function value -> inlined function source', () => {
    const result = serialize({ fn: function add(a: number, b: number) {
      return a + b
    } })
    expect(result).toContain('function add(a, b)')
  })

  it('escapes unsafe HTML/line-terminator chars by default (XSS-safety when embedding in <script>)', () => {
    expect(serialize({ html: '</script>' })).not.toContain('</script>')
  })

  it('unsafe: true skips escaping of HTML chars', () => {
    expect(serialize({ html: '</script>' }, { unsafe: true })).toContain('</script>')
  })

  it('space option formats output with indentation, like JSON.stringify', () => {
    expect(serialize({ a: 1 }, { space: 2 })).toBe('{\n  "a": 1\n}')
  })
})

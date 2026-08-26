import { describe, expect, it } from 'vitest'
import { BXRestMapResult, instanceOfiBXRestAnswerSuccess } from './mapResult'

describe('instanceOfiBXRestAnswerSuccess', () => {
  it('object with a "result" key -> true', () => {
    expect(instanceOfiBXRestAnswerSuccess({ result: 42 })).toBe(true)
  })

  it('object without a "result" key -> false', () => {
    expect(instanceOfiBXRestAnswerSuccess({ error: 'INSUFFICIENT_SCOPE' })).toBe(false)
  })
})

describe('BXRestMapResult', () => {
  it('success answer -> unwraps result', () => {
    expect(BXRestMapResult({ result: 'value' } as any)).toBe('value')
  })

  it('success answer with falsy-but-defined result (0) -> unwraps result, not undefined', () => {
    expect(BXRestMapResult({ result: 0 } as any)).toBe(0)
  })

  it('error answer (no "result" key) -> undefined', () => {
    expect(BXRestMapResult({ error: 'expired_token' } as any)).toBeUndefined()
  })

  it('undefined input -> undefined', () => {
    expect(BXRestMapResult(undefined)).toBeUndefined()
  })
})

import { describe, expect, it } from 'vitest'
import { lowerCaseOrder } from './lowerCaseOrder'

describe('lowerCaseOrder', () => {
  it('undefined -> undefined', () => {
    expect(lowerCaseOrder(undefined)).toBeUndefined()
  })

  it('lower-cases every value, keeps field names as-is', () => {
    expect(lowerCaseOrder({ ID: 'DESC', TITLE: 'ASC' })).toEqual({ ID: 'desc', TITLE: 'asc' })
  })

  it('empty object -> empty object', () => {
    expect(lowerCaseOrder({})).toEqual({})
  })
})

import { describe, expect, it } from 'vitest'
import { serializeBitrixParams } from './serializeBitrixParams'

describe('serializeBitrixParams', () => {
  it('flat params are serialized as key=value pairs', () => {
    expect(serializeBitrixParams({ ID: 1, NAME: 'test' })).toBe('ID=1&NAME=test')
  })

  it('nested object uses bracket notation expected by Bitrix', () => {
    expect(serializeBitrixParams({ fields: { NAME: 'Ivan' } })).toBe('fields%5BNAME%5D=Ivan')
  })

  it('arrays use indexed bracket notation, e.g. fields[PHONE][0][VALUE]', () => {
    const result = serializeBitrixParams({
      fields: { PHONE: [{ VALUE: '123', VALUE_TYPE: 'WORK' }] },
    })

    expect(result).toBe(
      'fields%5BPHONE%5D%5B0%5D%5BVALUE%5D=123&fields%5BPHONE%5D%5B0%5D%5BVALUE_TYPE%5D=WORK'
    )
  })

  it('null value is serialized as an empty parameter (key=)', () => {
    expect(serializeBitrixParams({ COMMENT: null })).toBe('COMMENT=')
  })

  it('empty object -> empty string', () => {
    expect(serializeBitrixParams({})).toBe('')
  })
})

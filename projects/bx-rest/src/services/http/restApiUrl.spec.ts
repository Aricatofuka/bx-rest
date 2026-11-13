import { describe, expect, it } from 'vitest'
import { restApiBaseUrl } from './restApiUrl'

// Адрес REST v3: https://apidocs.bitrix24.ru/api-reference/rest-v3.html#call
describe('restApiBaseUrl', () => {
  it.each([
    ['https://b24.example.com/rest/', 'https://b24.example.com/rest/api/'],
    ['https://b24.example.com/rest', 'https://b24.example.com/rest/api/'],
    ['rest/', 'rest/api/'],
    ['/rest/', '/rest/api/'],
    ['https://b24.example.com/rest/1/CODE/', 'https://b24.example.com/rest/api/1/CODE/'],
    ['https://b24.example.com/rest/1/CODE', 'https://b24.example.com/rest/api/1/CODE/'],
  ])('%s → %s', (base, expected) => {
    expect(restApiBaseUrl(base)).toBe(expected)
  })

  it('an address that already has api/ after rest/ stays as is', () => {
    expect(restApiBaseUrl('https://b24.example.com/rest/api/1/CODE/')).toBe('https://b24.example.com/rest/api/1/CODE/')
  })

  it('looks for the rest segment in the path, not in the host', () => {
    expect(restApiBaseUrl('https://rest.example.com/rest/1/CODE/')).toBe('https://rest.example.com/rest/api/1/CODE/')
  })

  it('an address without a rest segment, such as a proxy, gets api/ at the end', () => {
    expect(restApiBaseUrl('https://proxy.example.com/bitrix')).toBe('https://proxy.example.com/bitrix/api/')
  })

  it('a webhook behind a path prefix keeps the prefix', () => {
    expect(restApiBaseUrl('https://example.com/b24/rest/1/CODE/')).toBe('https://example.com/b24/rest/api/1/CODE/')
  })
})

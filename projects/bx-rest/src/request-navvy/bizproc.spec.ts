import { describe, expect, it } from 'vitest'
import { BXRestNavvyBizProc } from './bizproc'

describe('BXRestNavvyBizProc.startProcFormNewsFeed', () => {
  const start = (parameters: Record<string, string | Date>) => {
    new BXRestNavvyBizProc().startProcFormNewsFeed(1, parameters, {})
    return parameters['DATE_CREATE']
  }

  it('keeps a DATE_CREATE string given by the caller', () => {
    expect(start({ NAME: 'Request', DATE_CREATE: '01.02.2020' })).toBe('01.02.2020')
  })

  it('keeps a DATE_CREATE date given by the caller', () => {
    const date = new Date(2020, 1, 1)
    expect(start({ NAME: 'Request', DATE_CREATE: date })).toBe(date)
  })

  it.each([
    ['missing', { NAME: 'Request' }],
    ['blank', { NAME: 'Request', DATE_CREATE: '  ' }],
  ])('sets the current date when DATE_CREATE is %s', (_, parameters) => {
    expect(start(parameters)).toBeInstanceOf(Date)
  })
})

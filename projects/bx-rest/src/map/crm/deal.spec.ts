import { describe, expect, it } from 'vitest'
import { BXRestMapCrmDeal } from './deal'
import { iBXRestCrmDealHttp } from '../../typification/rest/crm'
import fixture from './__fixtures__/deal-get-answer.json'

// Mirrors a real crm.deal.get response item (HTTP shape: every field a string,
// dates as ISO 8601 with the portal's UTC offset — the format Bitrix24 CRM
// actually sends, unlike Calendar which uses the portal's configured format).
const httpDeal = fixture as unknown as iBXRestCrmDealHttp

describe('BXRestMapCrmDeal.get (httpToLocal)', () => {
  it('parses numeric ID/amount fields from strings', () => {
    const deal = BXRestMapCrmDeal.get(httpDeal)!

    expect(deal.ID).toBe(142)
    expect(deal.COMPANY_ID).toBe(34)
    expect(deal.CONTACT_ID).toBe(56)
    expect(deal.OPPORTUNITY).toBe(15000.5)
    expect(deal.PROBABILITY).toBe(60)
  })

  it('parses date fields into real Date instances', () => {
    const deal = BXRestMapCrmDeal.get(httpDeal)!

    expect(deal.DATE_CREATE).toBeInstanceOf(Date)
    expect(deal.DATE_CREATE?.toISOString()).toBe('2024-01-05T06:03:07.000Z')
    expect(deal.CLOSEDATE?.toISOString()).toBe('2024-01-31T21:00:00.000Z')
  })

  it('converts Bitrix "Y"/"N" flags to booleans', () => {
    const deal = BXRestMapCrmDeal.get(httpDeal)!

    expect(deal.OPENED).toBe(true)
    expect(deal.IS_MANUAL_OPPORTUNITY).toBe(false)
  })

  it('optional numeric fields are left undefined, not coerced from an empty/missing value', () => {
    const deal = BXRestMapCrmDeal.get({ ID: '1' })!

    expect(deal.COMPANY_ID).toBeUndefined()
    expect(deal.DATE_CREATE).toBeUndefined()
    expect(deal.OPENED).toBeUndefined()
  })

  it('undefined input -> undefined', () => {
    expect(BXRestMapCrmDeal.get(undefined)).toBeUndefined()
  })

  it('list() maps an array of deals', () => {
    const deals = BXRestMapCrmDeal.list([httpDeal, httpDeal])!
    expect(deals).toHaveLength(2)
    expect(deals[0].ID).toBe(142)
  })
})

describe('BXRestMapCrmDeal.localToHttp', () => {
  it('round-trips a deal back to Bitrix HTTP shape (ID and dates as strings, flags as Y/N)', () => {
    const local = BXRestMapCrmDeal.get(httpDeal)!
    const backToHttp = BXRestMapCrmDeal.localToHttp(local)

    expect(backToHttp.ID).toBe('142')
    expect(backToHttp.OPENED).toBe('Y')
    expect(backToHttp.IS_MANUAL_OPPORTUNITY).toBe('N')
    // The exact offset in the re-serialized string depends on the runner's local
    // timezone (toISOStringWithTimezone uses it), so instead of hardcoding a
    // string we check the shape and that it round-trips to the same instant.
    expect(backToHttp.DATE_CREATE).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/)
    expect(new Date(backToHttp.DATE_CREATE!).getTime()).toBe(local.DATE_CREATE!.getTime())
  })
})

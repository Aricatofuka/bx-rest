import { describe, expect, it } from 'vitest'
import { BXRestMapCalendarEvent } from './event'
import { iBXRestCalendarEventGetAnswerHttp } from '../../typification/rest/calendar/event/get'
import fixture from './__fixtures__/event-get-answer.json'

// The fixture mirrors a real calendar.event.get response item (HTTP shape:
// every field is a string, as Bitrix24 always sends it over the wire).
const httpAnswer = fixture as unknown as iBXRestCalendarEventGetAnswerHttp

describe('BXRestMapCalendarEvent', () => {
  it('parses numeric ID fields from strings', () => {
    const result = BXRestMapCalendarEvent.getById(httpAnswer)!

    expect(result.ID).toBe(555)
    expect(result.OWNER_ID).toBe(1)
    expect(result.SECTION_ID).toBe(10)
  })

  it('parses date fields using the portal date-time format', () => {
    const result = BXRestMapCalendarEvent.getById(httpAnswer)!

    expect(result.DATE_FROM).toBeInstanceOf(Date)
    expect(result.DATE_FROM.getFullYear()).toBe(2024)
    expect(result.DATE_FROM.getMonth()).toBe(0)
    expect(result.DATE_FROM.getDate()).toBe(5)
    expect(result.DATE_FROM.getHours()).toBe(10)
  })

  it('parses EXDATE (";"-separated date-only strings) into an array of Dates', () => {
    const result = BXRestMapCalendarEvent.getById(httpAnswer)!

    expect(result.EXDATE).toHaveLength(2)
    expect(result.EXDATE[0].getDate()).toBe(12)
    expect(result.EXDATE[1].getDate()).toBe(19)
  })

  it('parses RRULE.UNTIL using the date-only format derived from the date-time format', () => {
    const result = BXRestMapCalendarEvent.getById(httpAnswer)!

    expect(result.RRULE?.UNTIL).toBeInstanceOf(Date)
    expect(result.RRULE?.UNTIL?.getDate()).toBe(26)
  })

  it('converts Bitrix "Y"/"N" flags to booleans', () => {
    const result = BXRestMapCalendarEvent.getById(httpAnswer)!

    expect(result.DELETED).toBe(false)
    expect(result.MEETING_STATUS).toBe(true)
    expect(result.DT_SKIP_TIME).toBe(false)
  })

  it('empty EXDATE string -> empty array, not a parse error', () => {
    const result = BXRestMapCalendarEvent.getById({ ...httpAnswer, EXDATE: '' })!
    expect(result.EXDATE).toEqual([])
  })

  it('null ORIGINAL_DATE_FROM stays null instead of being parsed', () => {
    const result = BXRestMapCalendarEvent.getById(httpAnswer)!
    expect(result.ORIGINAL_DATE_FROM).toBeNull()
  })

  it('null/undefined input -> undefined (getById and get)', () => {
    expect(BXRestMapCalendarEvent.getById(null)).toBeUndefined()
    expect(BXRestMapCalendarEvent.getById(undefined)).toBeUndefined()
    expect(BXRestMapCalendarEvent.get(undefined)).toBeUndefined()
  })

  it('get() maps an array of events', () => {
    const result = BXRestMapCalendarEvent.get([httpAnswer, httpAnswer])!
    expect(result).toHaveLength(2)
    expect(result[0].ID).toBe(555)
  })
})

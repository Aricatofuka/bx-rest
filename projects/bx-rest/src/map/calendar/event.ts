import { toDate, toNum } from '../../services/base'
import {
  iBXRestCalendarEventGetAnswer,
  iBXRestCalendarEventGetAnswerHttp
} from '../../typification/rest/calendar/event/get'

export class BXRestMapCalendarEvent {

  static getById(item: iBXRestCalendarEventGetAnswerHttp | undefined | null): iBXRestCalendarEventGetAnswer | undefined {
    return (item) ? BXRestMapCalendarEvent.CalendarEventGetAnswerHttpToCalendarEventGetAnswer(item) : undefined
  }

  static get(item: iBXRestCalendarEventGetAnswerHttp[] | undefined): iBXRestCalendarEventGetAnswer[] | undefined {
    return (item) ? item.map(i => BXRestMapCalendarEvent.CalendarEventGetAnswerHttpToCalendarEventGetAnswer(i)) : undefined
  }

  static CalendarEventGetAnswerHttpToCalendarEventGetAnswer(item: iBXRestCalendarEventGetAnswerHttp): iBXRestCalendarEventGetAnswer {
    return {
      ...item,
      ID: toNum(item.ID),
      MEETING_HOST: toNum(item.MEETING_HOST),
      OWNER_ID: toNum(item.OWNER_ID),
      PARENT_ID: toNum(item.PARENT_ID),
      RECURRENCE_ID: toNum(item.RECURRENCE_ID),
      SECT_ID: toNum(item.SECT_ID),
      SECTION_ID: toNum(item.SECTION_ID),
      TZ_OFFSET_FROM: toNum(item.TZ_OFFSET_FROM),
      TZ_OFFSET_TO: toNum(item.TZ_OFFSET_TO),
      VERSION: toNum(item.VERSION),
      DATE_CREATE: toDate(item.DATE_CREATE, 'dd.MM.yyyy HH:mm:ss'),
      DATE_FROM: toDate(item.DATE_FROM, 'dd.MM.yyyy HH:mm:ss'),
      ORIGINAL_DATE_FROM: (item.ORIGINAL_DATE_FROM)
        ? toDate(item.ORIGINAL_DATE_FROM, 'dd.MM.yyyy HH:mm:ss')
        : null,
      DATE_TO: toDate(item.DATE_TO, 'dd.MM.yyyy HH:mm:ss'),
      TIMESTAMP_X: toDate(item.TIMESTAMP_X, 'dd.MM.yyyy HH:mm:ss'),
      DATE_FROM_TS_UTC: toNum(item.DATE_FROM_TS_UTC),
      DATE_TO_TS_UTC: toNum(item.DATE_TO_TS_UTC),
      DELETED: item.DELETED === 'Y',
      DT_LENGTH: toNum(item.DT_LENGTH),
      DT_SKIP_TIME: item.DT_SKIP_TIME === 'Y',
      MEETING_STATUS: item.MEETING_STATUS === 'Y',
      EXDATE: item.EXDATE.split(';').map(dateStr => toDate(dateStr, 'dd.MM.yyyy')),
      RRULE: (item.RRULE && typeof item.RRULE !== 'string') ? {
        ...item.RRULE,
        UNTIL: toDate(item.RRULE.UNTIL, 'dd.MM.yyyy'),
        '~UNTIL': toDate(item.RRULE['~UNTIL'], 'dd.MM.yyyy')
      } : null,
      ATTENDEE_LIST: (item.ATTENDEE_LIST) ? item.ATTENDEE_LIST.map(i => {
        return {id: i.id, entryId: toNum(i.entryId), status: i.status}
      }) : []
    }
  }
}

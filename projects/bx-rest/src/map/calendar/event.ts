import { Injectable } from '@angular/core'
import { BaseMapServices } from '../base'
import {
  iBXRestCalendarEventGetAnswer,
  iBXRestCalendarEventGetAnswerHttp
} from '../../typification/rest/calendar/get/answer'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapCalendarEvent extends BaseMapServices {

  get(item: iBXRestCalendarEventGetAnswerHttp[] | undefined): iBXRestCalendarEventGetAnswer[] | undefined{
    return (item) ? item.map(i => this.CalendarEventGetAnswerHttpToCalendarEventGetAnswer(i)) : undefined
  }

  private CalendarEventGetAnswerHttpToCalendarEventGetAnswer(item: iBXRestCalendarEventGetAnswerHttp): iBXRestCalendarEventGetAnswer {
    return {
      ...item,
      ID: this.toNum(item.ID),
      MEETING_HOST: this.toNum(item.MEETING_HOST),
      OWNER_ID: this.toNum(item.OWNER_ID),
      PARENT_ID: this.toNum(item.PARENT_ID),
      RECURRENCE_ID: this.toNum(item.RECURRENCE_ID),
      SECT_ID: this.toNum(item.SECT_ID),
      SECTION_ID: this.toNum(item.SECTION_ID),
      TZ_OFFSET_FROM: this.toNum(item.TZ_OFFSET_FROM),
      TZ_OFFSET_TO: this.toNum(item.TZ_OFFSET_TO),
      VERSION: this.toNum(item.VERSION),
      DATE_CREATE: this.toDate(item.DATE_CREATE, 'dd.MM.yyyy HH:mm:ss', {zone: item.TZ_FROM}), // Возможно тут ненужно преобразование по часовому поясу (пометить есть нужно)
      DATE_FROM: this.toDate(item.DATE_FROM, 'dd.MM.yyyy HH:mm:ss', {zone: item.TZ_FROM}),
      ORIGINAL_DATE_FROM: (item.ORIGINAL_DATE_FROM)
        ? this.toDate(item.ORIGINAL_DATE_FROM, 'dd.MM.yyyy HH:mm:ss')
        : null,
      DATE_TO: this.toDate(item.DATE_TO, 'dd.MM.yyyy HH:mm:ss', {zone: item.TZ_TO}),
      TIMESTAMP_X: this.toDate(item.TIMESTAMP_X, 'dd.MM.yyyy HH:mm:ss', {zone: item.TZ_FROM}),  // Возможно тут ненужно преобразование по часовому поясу (пометить есть нужно)
      DATE_FROM_TS_UTC: this.toNum(item.DATE_FROM_TS_UTC),
      DATE_TO_TS_UTC: this.toNum(item.DATE_TO_TS_UTC),
      DELETED: item.DELETED === 'Y',
      DT_LENGTH: this.toNum(item.DT_LENGTH),
      DT_SKIP_TIME: item.DT_SKIP_TIME === 'Y',
      MEETING_STATUS: item.MEETING_STATUS === 'Y',
      EXDATE: item.EXDATE.split(';').map(dateStr => this.toDate(dateStr, 'dd.MM.yyyy')),
      RRULE: (item.RRULE && typeof item.RRULE !== 'string') ? {
        ...item.RRULE,
        UNTIL: this.toDate(item.RRULE.UNTIL, 'dd.MM.yyyy'),
        '~UNTIL': this.toDate(item.RRULE['~UNTIL'], 'dd.MM.yyyy')
      } : null,
      ATTENDEE_LIST: (item.ATTENDEE_LIST) ? item.ATTENDEE_LIST.map(i => {
        return {id: i.id, entryId: this.toNum(i.entryId), status: i.status}
      }) : []
    }
  }
}

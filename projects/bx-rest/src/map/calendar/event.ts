import { Injectable } from '@angular/core'
import BaseMapServices from '@/lib/services/base'
import {
    BXRestCalendarEventGetAnswer,
    BXRestCalendarEventGetAnswerHttp
} from '@/lib/typification/bitrix/api/rest/calendar/get/answer'

@Injectable({
    providedIn: 'root'
})
export class BXRestCalendarEventMapServices extends BaseMapServices {
    CalendarEventGetAnswerHttpToCalendarEventGetAnswer(item: BXRestCalendarEventGetAnswerHttp): BXRestCalendarEventGetAnswer{
        return {
            ...item,
            ID: this.toNumber(item.ID),
            MEETING_HOST: this.toNumber(item.MEETING_HOST),
            OWNER_ID: this.toNumber(item.OWNER_ID),
            PARENT_ID: this.toNumber(item.PARENT_ID),
            RECURRENCE_ID: this.toNumber(item.RECURRENCE_ID),
            SECT_ID: this.toNumber(item.SECT_ID),
            SECTION_ID: this.toNumber(item.SECTION_ID),
            TZ_OFFSET_FROM: this.toNumber(item.TZ_OFFSET_FROM),
            TZ_OFFSET_TO: this.toNumber(item.TZ_OFFSET_TO),
            VERSION: this.toNumber(item.VERSION),
            DATE_CREATE: this.toDate(item.DATE_CREATE,'dd.MM.yyyy HH:mm:ss', {zone: item.TZ_FROM}), // Возможно тут ненужно преобразование по часовому поясу (пометить есть нужно)
            DATE_FROM: this.toDate(item.DATE_FROM, 'dd.MM.yyyy HH:mm:ss',{zone: item.TZ_FROM}),
            ORIGINAL_DATE_FROM: (item.ORIGINAL_DATE_FROM)
                ? this.toDate(item.ORIGINAL_DATE_FROM, 'dd.MM.yyyy HH:mm:ss')
                : null,
            DATE_TO: this.toDate(item.DATE_TO, 'dd.MM.yyyy HH:mm:ss',{zone: item.TZ_TO}),
            TIMESTAMP_X: this.toDate(item.TIMESTAMP_X, 'dd.MM.yyyy HH:mm:ss', {zone: item.TZ_FROM}),  // Возможно тут ненужно преобразование по часовому поясу (пометить есть нужно)
            DATE_FROM_TS_UTC: this.toNumber(item.DATE_FROM_TS_UTC),
            DATE_TO_TS_UTC: this.toNumber(item.DATE_TO_TS_UTC),
            DELETED: item.DELETED === 'Y',
            DT_LENGTH: this.toNumber(item.DT_LENGTH),
            DT_SKIP_TIME: item.DT_SKIP_TIME === 'Y',
            MEETING_STATUS: item.MEETING_STATUS === 'Y',
            EXDATE: item.EXDATE.split(';').map(dateStr => this.toDate(dateStr, 'dd.MM.yyyy')),
            RRULE: (item.RRULE && typeof item.RRULE !== 'string') ? {
                ... item.RRULE,
                UNTIL: this.toDate(item.RRULE.UNTIL, 'dd.MM.yyyy'),
                '~UNTIL': this.toDate(item.RRULE['~UNTIL'], 'dd.MM.yyyy')
            } : null,
            ATTENDEE_LIST: (item.ATTENDEE_LIST) ? item.ATTENDEE_LIST.map(i => {
                return {id: i.id, entryId: this.toNumber(i.entryId), status: i.status}
            }) : []
        }
    }
}

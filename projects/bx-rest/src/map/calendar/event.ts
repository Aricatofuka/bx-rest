import { deriveDateOnlyFormat, toDate, toNum } from '../../services/base'
import {
  iBXRestCalendarEventGetAnswer,
  iBXRestCalendarEventGetAnswerHttp
} from '../../typification/rest/calendar/event/get'

export class BXRestMapCalendarEvent {

  /**
   * @param item
   * @param dateTimeFormat Формат полей с датой и временем (`DATE_CREATE`, `DATE_FROM`, `DATE_TO`, `TIMESTAMP_X`
   *   и т.д.). По умолчанию — распространённый на многих порталах `'dd.MM.yyyy HH:mm:ss'`, но реальный формат
   *   зависит от настроек портала (Настройки → формат даты и времени) — если он известен, передавайте его явно.
   *   Формат для полей только с датой (`EXDATE`, `RRULE.UNTIL`) выводится из этого же значения
   *   (отбрасыванием `HH:mm:ss`) — передавать его отдельно не нужно.
   */
  static getById(
    item: iBXRestCalendarEventGetAnswerHttp | undefined | null,
    dateTimeFormat = 'dd.MM.yyyy HH:mm:ss'
  ): iBXRestCalendarEventGetAnswer | undefined {
    return (item) ? BXRestMapCalendarEvent.CalendarEventGetAnswerHttpToCalendarEventGetAnswer(item, dateTimeFormat) : undefined
  }

  /** @see getById */
  static get(
    item: iBXRestCalendarEventGetAnswerHttp[] | undefined,
    dateTimeFormat = 'dd.MM.yyyy HH:mm:ss'
  ): iBXRestCalendarEventGetAnswer[] | undefined {
    return (item) ? item.map(i => BXRestMapCalendarEvent.CalendarEventGetAnswerHttpToCalendarEventGetAnswer(i, dateTimeFormat)) : undefined
  }

  /** @see getById */
  static CalendarEventGetAnswerHttpToCalendarEventGetAnswer(
    item: iBXRestCalendarEventGetAnswerHttp,
    dateTimeFormat = 'dd.MM.yyyy HH:mm:ss'
  ): iBXRestCalendarEventGetAnswer {
    const dateFormat = deriveDateOnlyFormat(dateTimeFormat)

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
      DATE_CREATE: toDate(item.DATE_CREATE, dateTimeFormat),
      DATE_FROM: toDate(item.DATE_FROM, dateTimeFormat),
      ORIGINAL_DATE_FROM: (item.ORIGINAL_DATE_FROM)
        ? toDate(item.ORIGINAL_DATE_FROM, dateTimeFormat)
        : null,
      DATE_TO: toDate(item.DATE_TO, dateTimeFormat),
      TIMESTAMP_X: toDate(item.TIMESTAMP_X, dateTimeFormat),
      DATE_FROM_TS_UTC: toNum(item.DATE_FROM_TS_UTC),
      DATE_TO_TS_UTC: toNum(item.DATE_TO_TS_UTC),
      DELETED: item.DELETED === 'Y',
      DT_LENGTH: toNum(item.DT_LENGTH),
      DT_SKIP_TIME: item.DT_SKIP_TIME === 'Y',
      MEETING_STATUS: item.MEETING_STATUS === 'Y',
      // EXDATE и RRULE.UNTIL/'~UNTIL' у Bitrix нередко приходят пустой строкой (нет исключённых
      // дат повторения / правило повторения ограничено через COUNT, а не датой) — пустую строку
      // toDate() распарсить не может ни при каком формате, поэтому такие поля пропускаем до вызова
      EXDATE: item.EXDATE ? item.EXDATE.split(';').filter(Boolean).map(dateStr => toDate(dateStr, dateFormat)) : [],
      RRULE: (item.RRULE && typeof item.RRULE !== 'string') ? {
        ...item.RRULE,
        UNTIL: item.RRULE.UNTIL ? toDate(item.RRULE.UNTIL, dateFormat) : null,
        '~UNTIL': item.RRULE['~UNTIL'] ? toDate(item.RRULE['~UNTIL'], dateFormat) : null
      } : null,
      ATTENDEE_LIST: (item.ATTENDEE_LIST) ? item.ATTENDEE_LIST.map(i => {
        return {id: i.id, entryId: toNum(i.entryId), status: i.status}
      }) : []
    }
  }
}

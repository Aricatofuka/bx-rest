import { iBXRestCalendarSectionGet, iBXRestCalendarSectionGetHttp } from '../../typification/rest/calendar/section/get'
import { toDate, toNum } from '../../services/base'

export class BXRestMapCalendarSection {

  /**
   * @param item
   * @param dateTimeFormat Формат полей `DATE_CREATE`/`TIMESTAMP_X`. По умолчанию — распространённый на многих
   *   порталах `'dd.MM.yyyy HH:mm:ss'`, но реальный формат зависит от настроек портала (Настройки → формат
   *   даты и времени) — если он известен, передавайте его явно.
   */
  static get(
    item: iBXRestCalendarSectionGetHttp[] | undefined,
    dateTimeFormat = 'dd.MM.yyyy HH:mm:ss'
  ): iBXRestCalendarSectionGet[] | undefined{
    return (item) ? item.map(i => BXRestMapCalendarSection.CalendarSectionGetHttpToCalendarSectionGetHttp(i, dateTimeFormat)) : undefined
  }

  /** @see get */
  static CalendarSectionGetHttpToCalendarSectionGetHttp(
    item: iBXRestCalendarSectionGetHttp,
    dateTimeFormat = 'dd.MM.yyyy HH:mm:ss'
  ): iBXRestCalendarSectionGet {
    return {
      ...item,
      ID: toNum(item.ID),
      OWNER_ID: toNum(item.OWNER_ID),
      CREATED_BY: toNum(item.CREATED_BY),
      DATE_CREATE: toDate(item.DATE_CREATE, dateTimeFormat),
      TIMESTAMP_X: toDate(item.TIMESTAMP_X, dateTimeFormat)
    }
  }
}

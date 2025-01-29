import { iBXRestCalendarSectionGet, iBXRestCalendarSectionGetHttp } from '../../typification/rest/calendar/section/get'
import { toDate, toNum } from '../../services/base'

export class BXRestMapCalendarSection {

  static get(item: iBXRestCalendarSectionGetHttp[] | undefined): iBXRestCalendarSectionGet[] | undefined{
    return (item) ? item.map(i => BXRestMapCalendarSection.CalendarSectionGetHttpToCalendarSectionGetHttp(i)) : undefined
  }

  static CalendarSectionGetHttpToCalendarSectionGetHttp(item: iBXRestCalendarSectionGetHttp): iBXRestCalendarSectionGet {
    return {
      ...item,
      ID: toNum(item.ID),
      OWNER_ID: toNum(item.OWNER_ID),
      CREATED_BY: toNum(item.CREATED_BY),
      DATE_CREATE: toDate(item.DATE_CREATE, 'dd.MM.yyyy HH:mm:ss'),
      TIMESTAMP_X: toDate(item.TIMESTAMP_X, 'dd.MM.yyyy HH:mm:ss')
    }
  }
}

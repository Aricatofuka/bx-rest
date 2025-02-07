import {
  iBXRestCalendarUserSettingsGet,
  iBXRestCalendarUserSettingsGetHttp
} from '../../../typification/rest/calendar/user/settings/get'
import { toNum } from '../../../services/base'

export class BXRestMapCalendarUserSettings {

  static get(item: iBXRestCalendarUserSettingsGetHttp | undefined): iBXRestCalendarUserSettingsGet | undefined {
    return (item) ?
      {
        ...item,
        meetSection: toNum(item.meetSection),
        crmSection: toNum(item.crmSection),
        collapseOffHours: item.collapseOffHours === 'Y',
        showWeekNumbers: item.showWeekNumbers === 'Y',
        showTasks: item.showTasks === 'Y',
        syncTasks: item.syncTasks === 'Y',
        showCompletedTasks: item.showCompletedTasks === 'Y',
        lastUsedSection: (item.lastUsedSection !== 'false') ? toNum(item.lastUsedSection) : false,
        defaultSections: item.defaultSections.map(obj =>
          Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, Number(value)])
          )
        ),
        syncPeriodPast: toNum(item.syncPeriodPast),
        syncPeriodFuture: toNum(item.syncPeriodPast),
      }
      : undefined
  }

}
import { Injectable } from '@angular/core'
import { statusWorkDayToday, statusWorkDayTodayHttp } from '@/lib/typification/bitrix/api/rest/timeman/status'
import { BaseMapServices } from '@/lib/services/map/base'

@Injectable({
  providedIn: 'root'
})
export default class TimemanMapServices extends BaseMapServices {

  mapWorkDayStatus(status: statusWorkDayTodayHttp): statusWorkDayToday {
    const duration = status.DURATION.split(':')
    const time_leaks = status.TIME_LEAKS.split(':')
    return {
      STATUS: status.STATUS,
      TIME_START: (status.TIME_START) ? new Date(status.TIME_START) : undefined,
      TIME_FINISH: (status.TIME_FINISH) ? new Date(status.TIME_FINISH) : undefined,
      DURATION: (duration.length && duration.length == 3)
        ? Number(duration[0]) * 60 * 60 + Number(duration[1]) * 60 + Number(duration[2]) : 0,
      TIME_LEAKS: (time_leaks.length && time_leaks.length == 3)
        ? Number(time_leaks[0]) * 60 * 60 + Number(time_leaks[1]) * 60 + Number(time_leaks[2]) : 0,
      ACTIVE: status.ACTIVE,
      IP_OPEN: status.IP_CLOSE,
      IP_CLOSE: status.IP_CLOSE,
      LAT_OPEN: status.LAT_OPEN,
      LON_OPEN: status.LON_OPEN,
      LAT_CLOSE: status.LAT_CLOSE,
      LON_CLOSE: status.LON_CLOSE,
      TZ_OFFSET: status.TZ_OFFSET
    }
  }

}

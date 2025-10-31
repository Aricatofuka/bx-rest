import { iBXRestImUserGet, iBXRestImUserGetHttp } from '../../typification/rest/im/user/get'
import { toDate } from '../../services/base'

export class BXRestMapImUser {

  static get(value: iBXRestImUserGetHttp | undefined): iBXRestImUserGet | undefined {
    return (value)
      ? {
        ...value,
        ...{
          last_activity_date: toDate(value.last_activity_date),
          mobile_last_date: value.mobile_last_date ? toDate(value.mobile_last_date) : false,
          desktop_last_date: value.desktop_last_date ? toDate(value.desktop_last_date) : false,
        }
      }
      : undefined
  }
}

import { toDate } from '../../../services/base'
import { iBXRestImDialogUserGet, iBXRestImDialogUserGetHttp } from '../../../typification/rest/im/dialog/user/get'

export class BXRestMapImDialogUsers {

  static list(value: iBXRestImDialogUserGetHttp | undefined): iBXRestImDialogUserGet | undefined {
    return (value)
      ? {
        ...value,
        ...{
          last_activity_date: toDate(value.last_activity_date),
          mobile_last_date: value.mobile_last_date ? toDate(value.mobile_last_date) : false,
        }
      }
      : undefined
  }
}
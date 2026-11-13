import { toDate } from '../../../services/base'
import { iBXRestImDialogUserGet, iBXRestImDialogUserGetHttp } from '../../../typification/rest/im/dialog/user/get'

export class BXRestMapImDialogUsers {

  /** `result` метода `im.dialog.users.list` — массив участников */
  static list(value: iBXRestImDialogUserGetHttp[] | undefined): iBXRestImDialogUserGet[] | undefined {
    return value?.map(user => ({
      ...user,
      last_activity_date: toDate(user.last_activity_date),
      mobile_last_date: user.mobile_last_date ? toDate(user.mobile_last_date) : false,
    }))
  }
}

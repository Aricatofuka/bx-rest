import { $dialog, $im, $list, $users } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestImDialogUserGet,
  iBXRestImDialogUserGetHttp,
  iBXRestImDialogUserGetParam
} from '../../../typification/rest/im/dialog/user/get'
import { BXRestMapImDialogUsers } from '../../../map/im/gialog/users'

export class BXRestNavvyImDialogUsers {

  private Navvy = new Navvy()

  list(param: iBXRestImDialogUserGetParam) {
    return this.Navvy.simple<iBXRestImDialogUserGetHttp, iBXRestImDialogUserGet, iBXRestImDialogUserGetParam>(
      [$im, $dialog, $users, $list],
      param,
      BXRestMapImDialogUsers.list
    )
  }
}
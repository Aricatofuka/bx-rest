import { $dialog, $im, $list, $users } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestImDialogUserGet,
  iBXRestImDialogUserGetHttp,
  iBXRestImDialogUserGetParam
} from '../../../typification/rest/im'
import { BXRestMapImDialogUsers } from '../../../map/im/gialog/users'
import { IM_LIST_NAV } from '../../../services/navvy/sequential-navs'

export class BXRestNavvyImDialogUsers {

  private Navvy = new Navvy()

  /**
   * Возвращает список участников чата
   */
  list(param: iBXRestImDialogUserGetParam) {
    return this.Navvy.pagNavOffset<iBXRestImDialogUserGetHttp[], iBXRestImDialogUserGet[], iBXRestImDialogUserGetParam>(
      [$im, $dialog, $users, $list],
      param,
      IM_LIST_NAV,
      BXRestMapImDialogUsers.list
    )
  }
}

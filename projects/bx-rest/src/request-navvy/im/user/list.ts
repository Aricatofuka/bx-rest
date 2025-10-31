import { Navvy } from '../../../services/navvy'
import { iBXRestImUserListGetParam } from '../../../typification/rest/im/user/list/get'
import { iBXRestImUserGet, iBXRestImUserGetHttp } from '../../../typification/rest/im/user/get'
import { $get, $im, $list, $user } from '../../../consts/part-name-methods'
import { BXRestMapImUserList } from '../../../map/im/user/list'

export class BXRestNavvyImUserList {
  private Navvy = new Navvy()

  /** Получить данные о пользователях */
  get(param: iBXRestImUserListGetParam) {
    return this.Navvy.simple<(iBXRestImUserGetHttp | null)[], (iBXRestImUserGet | undefined)[], iBXRestImUserListGetParam>(
      [$im, $user, $list, $get],
      param,
      BXRestMapImUserList.get
    )
  }
}
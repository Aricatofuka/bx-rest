import { Navvy } from '../../services/navvy'
import { $get, $im, $user } from '../../consts/part-name-methods'
import { iBXRestImUserGet, iBXRestImUserGetHttp, iBXRestImUserGetParam } from '../../typification/rest/im'
import { BXRestMapImUser } from '../../map/im/user'
import { BXRestNavvyImUserStatus } from './user/status'
import { BXRestNavvyImUserList } from './user/list'

export class BXRestNavvyImUser {
  private Navvy = new Navvy()

  public readonly list = new BXRestNavvyImUserList()
  public readonly status = new BXRestNavvyImUserStatus()
  /**
   * Получить данные о пользователе
   *
   * @param param
   */
  get(param: iBXRestImUserGetParam) {
    return this.Navvy.simple<iBXRestImUserGetHttp, iBXRestImUserGet, iBXRestImUserGetParam>(
      [$im, $user, $get],
      param,
      BXRestMapImUser.get
    )
  }
}

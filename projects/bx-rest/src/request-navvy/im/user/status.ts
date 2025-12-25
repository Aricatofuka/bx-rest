import { Navvy } from '../../../services/navvy'
import { iBXRestImUserStatusGet, iBXRestImUserStatusSet } from '../../../typification/rest/im'
import { $get, $im, $set, $status, $user } from '../../../consts/part-name-methods'
import { BXRestNavvyImUserStatusIdle } from './status/idle'

export class BXRestNavvyImUserStatus {
  private Navvy = new Navvy()

  public readonly idle = new BXRestNavvyImUserStatusIdle()

  /**
   * Получить информацию об установленном статусе пользователя
   */
  get(){
    return this.Navvy.simple<iBXRestImUserStatusGet>([$im, $user, $status, $get])
  }

  /**
   * Установить статус пользователя
   */
  set(param: iBXRestImUserStatusSet) {
    return this.Navvy.simple<boolean, boolean, iBXRestImUserStatusSet>([$im, $user, $status, $set], param)
  }

}
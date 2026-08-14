import { Navvy } from '../../../../services/navvy'
import { $end, $idle, $im, $start, $status, $user } from '../../../../consts/part-name-methods'
import { iBXRestImUserStatusIdleStartParam } from '../../../../typification/rest/im'

export class BXRestNavvyImUserStatusIdle {
  private Navvy = new Navvy()

  /**
   * Устанавливает автоматический статус «Отошёл».
   */
  start(param: iBXRestImUserStatusIdleStartParam){
    return this.Navvy.simple<boolean, boolean, iBXRestImUserStatusIdleStartParam>(
      [$im, $user, $status, $idle, $start],
      param
    )
  }

  /**
   * Отключает автоматический статус «Отошёл».
   */
  end() {
    return this.Navvy.simple<boolean, boolean>([$im, $user, $status, $idle, $end])
  }
}
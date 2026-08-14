import { Navvy } from '../../../services/navvy'
import { iBXRestParamImNotifyPersonalAdd } from '../../../typification/rest/im'
import { $add, $im, $notify, $personal } from '../../../consts/part-name-methods'

export class BXRestNavvyImNotifyPersonal {
  private readonly Navvy = new Navvy()

  /**
   * Отправляет персональное уведомление.
   */
  add(param: iBXRestParamImNotifyPersonalAdd) {
    return this.Navvy.simple<number, number, iBXRestParamImNotifyPersonalAdd>(
      [$im, $notify, $personal, $add],
      param
    )
  }
}


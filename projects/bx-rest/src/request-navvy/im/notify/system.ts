import { Navvy } from '../../../services/navvy'
import { iBXRestParamImNotifySystemAdd } from '../../../typification/rest/im'
import { $add, $im, $notify, $system } from '../../../consts/part-name-methods'

export class BXRestNavvyImNotifySystem {
  private readonly Navvy = new Navvy()

  add(param: iBXRestParamImNotifySystemAdd) {
    return this.Navvy.simple<number, number, iBXRestParamImNotifySystemAdd>(
      [$im, $notify, $system, $add],
      param
    )
  }
}


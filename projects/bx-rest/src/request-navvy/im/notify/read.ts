import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImNotifyRead, iBXRestParamImNotifyReadList } from '../../../typification/rest/im'
import { $all, $im, $list, $notify, $read } from '../../../consts/part-name-methods'

export class BXRestNavvyImNotifyRead {
  private readonly Navvy = new Navvy()

  one(param: iBXRestParamImNotifyRead = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImNotifyRead>(
      [$im, $notify, $read],
      param
    )
  }

  all() {
    return this.Navvy.simple<iBXRestImObject>([$im, $notify, $read, $all])
  }

  list(param: iBXRestParamImNotifyReadList) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImNotifyReadList>(
      [$im, $notify, $read, $list],
      param
    )
  }
}


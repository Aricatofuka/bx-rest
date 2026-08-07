import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImNotifyHistorySearch } from '../../../typification/rest/im'
import { $history, $im, $notify, $search } from '../../../consts/part-name-methods'

export class BXRestNavvyImNotifyHistory {
  private readonly Navvy = new Navvy()

  search(param: iBXRestParamImNotifyHistorySearch = {}) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImNotifyHistorySearch
    >([$im, $notify, $history, $search], param)
  }
}


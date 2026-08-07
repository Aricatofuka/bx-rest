import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImSearchUserList } from '../../../typification/rest/im'
import { $im, $list, $search, $user } from '../../../consts/part-name-methods'

export class BXRestNavvyImSearchUser {
  private readonly Navvy = new Navvy()

  list(param: iBXRestParamImSearchUserList) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImSearchUserList
    >([$im, $search, $user, $list], param)
  }
}


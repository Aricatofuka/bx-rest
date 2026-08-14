import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImSearchChatList } from '../../../typification/rest/im'
import { $chat, $im, $list, $search } from '../../../consts/part-name-methods'

export class BXRestNavvyImSearchChat {
  private readonly Navvy = new Navvy()

  /**
   * Ищет чаты по названию.
   */
  list(param: iBXRestParamImSearchChatList) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImSearchChatList
    >([$im, $search, $chat, $list], param)
  }
}


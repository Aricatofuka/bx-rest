import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImSearchUserList } from '../../../typification/rest/im'
import { $im, $list, $search, $user } from '../../../consts/part-name-methods'
import { IM_SEARCH_NAV } from '../../../services/navvy/sequential-navs'

export class BXRestNavvyImSearchUser {
  private readonly Navvy = new Navvy()

  /**
   * Ищет пользователей. Результат — объект, где ключ — идентификатор пользователя.
   * Если никого не нашлось, портал отдаёт пустой массив `[]`
   */
  list(param: iBXRestParamImSearchUserList) {
    return this.Navvy.pagNavOffset<
      Record<string, iBXRestImObject>,
      Record<string, iBXRestImObject>,
      iBXRestParamImSearchUserList
    >([$im, $search, $user, $list], param, IM_SEARCH_NAV)
  }
}

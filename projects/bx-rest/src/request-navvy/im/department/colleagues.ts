import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImDepartmentColleaguesList } from '../../../typification/rest/im'
import { $colleagues, $department, $im, $list } from '../../../consts/part-name-methods'
import { IM_SEARCH_NAV } from '../../../services/navvy/sequential-navs'

export class BXRestNavvyImDepartmentColleagues {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список коллег текущего пользователя
   */
  list(param: iBXRestParamImDepartmentColleaguesList = {}) {
    return this.Navvy.pagNavOffset<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImDepartmentColleaguesList
    >([$im, $department, $colleagues, $list], param, IM_SEARCH_NAV)
  }
}

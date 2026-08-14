import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImDepartmentColleaguesList } from '../../../typification/rest/im'
import { $colleagues, $department, $im, $list } from '../../../consts/part-name-methods'

export class BXRestNavvyImDepartmentColleagues {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список коллег текущего пользователя.
   */
  list(param: iBXRestParamImDepartmentColleaguesList = {}) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImDepartmentColleaguesList
    >([$im, $department, $colleagues, $list], param)
  }
}


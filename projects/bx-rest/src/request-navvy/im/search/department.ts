import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImSearchDepartmentList } from '../../../typification/rest/im'
import { $department, $im, $list, $search } from '../../../consts/part-name-methods'

export class BXRestNavvyImSearchDepartment {
  private readonly Navvy = new Navvy()

  /**
   * Ищет подразделения.
   */
  list(param: iBXRestParamImSearchDepartmentList) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImSearchDepartmentList
    >([$im, $search, $department, $list], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImDepartmentManagersGet } from '../../../typification/rest/im'
import { $department, $get, $im, $managers } from '../../../consts/part-name-methods'

export class BXRestNavvyImDepartmentManagers {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список руководителей подразделений.
   */
  get(param: iBXRestParamImDepartmentManagersGet) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImDepartmentManagersGet
    >([$im, $department, $managers, $get], param)
  }
}


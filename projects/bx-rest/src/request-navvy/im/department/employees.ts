import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImDepartmentEmployeesGet } from '../../../typification/rest/im'
import { $department, $employees, $get, $im } from '../../../consts/part-name-methods'

export class BXRestNavvyImDepartmentEmployees {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список сотрудников подразделения.
   */
  get(param: iBXRestParamImDepartmentEmployeesGet) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImDepartmentEmployeesGet
    >([$im, $department, $employees, $get], param)
  }
}


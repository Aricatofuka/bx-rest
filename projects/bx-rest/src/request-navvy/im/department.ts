import { Navvy } from '../../services/navvy'
import { iBXRestImObject, iBXRestParamImDepartmentGet } from '../../typification/rest/im'
import { $department, $get, $im } from '../../consts/part-name-methods'
import { BXRestNavvyImDepartmentColleagues } from './department/colleagues'
import { BXRestNavvyImDepartmentEmployees } from './department/employees'
import { BXRestNavvyImDepartmentManagers } from './department/managers'

export class BXRestNavvyImDepartment {
  private readonly Navvy = new Navvy()
  /**
   * Коллеги пользователя (`im.department.colleagues.*`).
   */
  public readonly colleagues = new BXRestNavvyImDepartmentColleagues()
  /**
   * Сотрудники подразделения (`im.department.employees.*`).
   */
  public readonly employees = new BXRestNavvyImDepartmentEmployees()
  /**
   * Руководители подразделений (`im.department.managers.*`).
   */
  public readonly managers = new BXRestNavvyImDepartmentManagers()

  /**
   * Возвращает информацию о подразделении.
   */
  get(param: iBXRestParamImDepartmentGet) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImDepartmentGet
    >([$im, $department, $get], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestImObject, iBXRestParamImDepartmentGet } from '../../typification/rest/im'
import { $department, $get, $im } from '../../consts/part-name-methods'
import { BXRestNavvyImDepartmentColleagues } from './department/colleagues'
import { BXRestNavvyImDepartmentEmployees } from './department/employees'
import { BXRestNavvyImDepartmentManagers } from './department/managers'

export class BXRestNavvyImDepartment {
  private readonly Navvy = new Navvy()
  public readonly colleagues = new BXRestNavvyImDepartmentColleagues()
  public readonly employees = new BXRestNavvyImDepartmentEmployees()
  public readonly managers = new BXRestNavvyImDepartmentManagers()

  get(param: iBXRestParamImDepartmentGet) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImDepartmentGet
    >([$im, $department, $get], param)
  }
}


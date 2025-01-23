import { iBXRestParamDepartmentGet } from '../typification/rest/department/get'
import { Navvy } from '../services/navvy'
import { BXRestMapDepartment } from '../map/department'
import { iBXRestParamDepartmentAdd } from '../typification/rest/department/add'
import { iBXRestDepartmentUpdate } from '../typification/rest/department/update'
import { methods } from '../typification/base/methods'

export class BXRestNavvyDepartment {

  url = methods.department
  protected Navvy = new Navvy()

  get(param: iBXRestParamDepartmentGet = {}) {
    return this.Navvy.PagNav(
      this.url.get,
      param,
      BXRestMapDepartment.get)
  }

  add(param: iBXRestParamDepartmentAdd) {
    return this.Navvy.simple(this.url.add, param)
  }

  del(id: number) {
    return this.Navvy.simple(this.url.del, {ID: id})
  }

  update(param: iBXRestDepartmentUpdate) {
    param.NAME = param.NAME.trim()
    return this.Navvy.simple(this.url.update, param)
  }
}

import {
  iBXRestParamDepartmentGet,
  iBXRestParamDepartmentAdd,
  iBXRestDepartmentUpdate,
  iBXRestParamDepartmentDel
} from '../typification/rest/department'
import { Navvy } from '../services/navvy'
import { BXRestMapDepartment } from '../map/department'
import { $add, $delete, $department, $get, $update } from '../consts/part-name-methods'

export class BXRestNavvyDepartment {

  url = {
    get: [$department, $get],
    del: [$department, $delete],
    add: [$department, $add],
    update: [$department, $update]
  }
  protected Navvy = new Navvy()

  get(param: iBXRestParamDepartmentGet = {}) {
    return this.Navvy.pagNav(
      this.url.get,
      param,
      BXRestMapDepartment.get)
  }

  add(param: iBXRestParamDepartmentAdd) {
    return this.Navvy.simple<number, number, iBXRestParamDepartmentAdd>(this.url.add, param)
  }

  del(id: number) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamDepartmentDel>(this.url.del, {ID: id})
  }

  update(param: iBXRestDepartmentUpdate) {
    param.NAME = param.NAME.trim()
    return this.Navvy.simple<boolean, boolean, iBXRestDepartmentUpdate>(this.url.update, param)
  }
}

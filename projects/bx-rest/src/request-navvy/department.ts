import { Injectable } from '@angular/core'
import { BXRestDepartment } from '../request/department'
import { iBXRestParamDepartmentGet } from '../typification/rest/department/get'
import { Navvy } from '../services/navvy'
import { BXRestMapDepartment } from '../map/department'
import { iBXRestParamDepartmentAdd } from '../typification/rest/department/add'
import { iBXRestDepartmentUpdate } from '../typification/rest/department/update'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDepartment {

  protected Navvy: Navvy<BXRestDepartment, BXRestMapDepartment>

  constructor(
    private BXRestDepartment: BXRestDepartment,
    private BXRestMapDepartment: BXRestMapDepartment
  ) {
    this.Navvy = new Navvy(this.BXRestDepartment, this.BXRestMapDepartment)
  }

  get(param: iBXRestParamDepartmentGet = {}) {
    return this.Navvy.PagNav(
      this.BXRestDepartment.get,
      param,
      this.BXRestMapDepartment.get)
  }

  add(param: iBXRestParamDepartmentAdd) {
    return this.Navvy.simpleWithArg(this.BXRestDepartment.add, param)
  }

  del(id: number) {
    return this.Navvy.simpleWithArg(this.BXRestDepartment.del, {ID: id})
  }

  update(param: iBXRestDepartmentUpdate) {
    param.NAME = param.NAME.trim()
    return this.Navvy.simpleWithArg(this.BXRestDepartment.update, param)
  }
}

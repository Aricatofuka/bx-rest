import {
  iBXRestParamDepartmentGet,
  iBXRestParamDepartmentAdd,
  iBXRestDepartmentUpdate,
  iBXRestParamDepartmentDel,
  iBXRestDepartmentFields
} from '../typification/rest/department'
import { Navvy } from '../services/navvy'
import { BXRestMapDepartment } from '../map/department'
import { $add, $delete, $department, $fields, $get, $update } from '../consts/part-name-methods'

export class BXRestNavvyDepartment {

  url = {
    get: [$department, $get],
    fields: [$department, $fields],
    del: [$department, $delete],
    add: [$department, $add],
    update: [$department, $update]
  }
  protected Navvy = new Navvy()

  /** Returns names and descriptions of the available department fields. */
  fields() {
    return this.Navvy.simple<iBXRestDepartmentFields>(this.url.fields)
  }

  /**
   * Возвращает список подразделений.
   */
  get(param: iBXRestParamDepartmentGet = {}) {
    return this.Navvy.pagNav(
      this.url.get,
      param,
      BXRestMapDepartment.get)
  }

  /**
   * Создаёт подразделение.
   */
  add(param: iBXRestParamDepartmentAdd) {
    return this.Navvy.simple<number, number, iBXRestParamDepartmentAdd>(this.url.add, param)
  }

  /**
   * Удаляет подразделение.
   */
  del(id: number) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamDepartmentDel>(this.url.del, {ID: id})
  }

  /**
   * Изменяет подразделение.
   */
  update(param: iBXRestDepartmentUpdate) {
    param.NAME = param.NAME.trim()
    return this.Navvy.simple<boolean, boolean, iBXRestDepartmentUpdate>(this.url.update, param)
  }
}

import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestParamDepartmentGet } from '../typification/rest/department/get'
import { iBXRestDepartmentHttp } from '../typification/rest/department/department'
import { iBXRestParamDepartmentAdd } from '../typification/rest/department/add'
import { iBXRestParamDepartmentDel } from '../typification/rest/department/del'
import { iBXRestDepartmentUpdate } from '../typification/rest/department/update'
import { methods } from '../typification/base/methods'

export class BXRestDepartment {
  protected url = methods.department

  private readonly http = new HttpBXServices()

  get(param: iBXRestParamDepartmentGet = {}) {
    return this.http.post<iBXRestDepartmentHttp[]>(this.url.get, param)
  }

  add(param: iBXRestParamDepartmentAdd) {
    return this.http.post<number>(this.url.add, param)
  }

  del(param: iBXRestParamDepartmentDel) {
    return this.http.post<boolean>(this.url.del, param)
  }

  update(param: iBXRestDepartmentUpdate) {
    return this.http.post<boolean>(this.url.update, param)
  }
}

import {
  iBXRestParamTaskItemUserFieldGetlist,
  iBXRestTaskItemUserFieldGetlistHttp
} from '../../../typification/rest/task/item/userfield/getlist'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { methods } from '../../../typification/base/methods'

export class BXRestTaskItemUserField {
  private readonly url = methods.task.item.userField
  private readonly http = new HttpBXServices()

  getList(param: iBXRestParamTaskItemUserFieldGetlist){
    return this.http.post<iBXRestTaskItemUserFieldGetlistHttp[]>(this.url.getList, param)
  }

}
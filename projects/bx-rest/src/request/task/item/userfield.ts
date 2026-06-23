import {
  iBXRestParamTaskItemUserFieldGetlist,
  iBXRestTaskItemUserFieldGetlistHttp
} from '../../../typification/rest/task/item/userfield/getlist'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { $item, $task, $userfield } from '../../../consts/part-name-methods'

export class BXRestTaskItemUserField {
  private readonly url = {
    getList: [$task, $item, $userfield, 'getlist'],
  }
  private readonly http = new HttpBXServices()

  getList(param: iBXRestParamTaskItemUserFieldGetlist){
    return this.http.post<iBXRestTaskItemUserFieldGetlistHttp[]>(this.url.getList, param)
  }

}

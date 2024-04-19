import { Injectable } from '@angular/core'
import {
  iBXRestParamTaskItemUserFieldGetlist,
  iBXRestTaskItemUserFieldGetlistHttp
} from '../../../typification/rest/task/item/userfield/getlist'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { methods } from '../../../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskItemUserField {

  private url = methods.task.item.userField

  constructor(
    private http: HttpBXServices
  ) {
  }

  getList(param: iBXRestParamTaskItemUserFieldGetlist){
    return this.http.post<iBXRestTaskItemUserFieldGetlistHttp[]>(this.url.getList, param)
  }

}
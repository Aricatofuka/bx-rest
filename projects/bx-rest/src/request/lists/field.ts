import { Injectable } from '@angular/core'
import {
  BXRestHttpListsFieldGet,
  iBXRestParamListField
} from '../../typification/rest/lists/field/get'
import { HttpBXServices } from '../../services/http/HttpBX'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export default class BXRestListsField {

  protected url = methods.lists.field

  constructor(
    private http: HttpBXServices,
  ) {
  }

  get(param: iBXRestParamListField) {
    return this.http.post<BXRestHttpListsFieldGet>(this.url.get, param)
  }

}

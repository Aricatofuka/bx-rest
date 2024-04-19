import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestHttpListsElement,
  iBXRestParamListsElementGet
} from '../../typification/rest/lists/element/get'
import { Injectable } from '@angular/core'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'
import { methods } from '../../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestListsElement {

  protected url = methods.lists.element

  constructor(
    private http: HttpBXServices,
  ) {
  }

  get(pram: iBXRestParamListsElementGet) {
    return this.http.post<iBXRestHttpListsElement[]>(
      this.url.get,
      pram
    )
  }

  add(param: iBXRestParamListsElementAdd) {
    return this.http.post<number>(this.url.add, param)
  }

}

import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestHttpListsElement,
  iBXRestParamListsElementGet
} from '../../typification/rest/lists/element/get'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'
import { $add, $element, $get, $lists } from '../../consts/part-name-methods'

export class BXRestListsElement {
  protected readonly url = {
    add: [$lists, $element, $add],
    get: [$lists, $element, $get],
  }
  private readonly http = new HttpBXServices()

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

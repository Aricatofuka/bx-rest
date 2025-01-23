import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestHttpListsElement,
  iBXRestParamListsElementGet
} from '../../typification/rest/lists/element/get'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'
import { methods } from '../../typification/base/methods'

export class BXRestListsElement {
  protected readonly url = methods.lists.element
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

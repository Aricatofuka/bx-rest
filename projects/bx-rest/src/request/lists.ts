import { Injectable } from '@angular/core'
import { BXRestListsElement } from './lists/element'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestListItemHttp, iBXRestParamListGet } from '../typification/rest/lists/get'
import BXRestListsField from './lists/field'
import { methods } from '../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestLists {
  protected url = methods.lists

  constructor(
    public element: BXRestListsElement,
    public field: BXRestListsField,
    private http: HttpBXServices,
  ) {
  }

  get(param: iBXRestParamListGet) {
    return this.http.post<iBXRestListItemHttp[]>(this.url.get, param)
  }

  // getField(pram: getListFieldParam): Observable<iHttpAnswerBX<FieldItemLists[]> | undefined> {
  //     return this.http.post<iHttpAnswerBX<{ [key: string]: FieldItemLists }>>(this.url.field.get, pram)
  // }
}

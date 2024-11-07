import { inject, Injectable } from '@angular/core'
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

  public readonly element = inject(BXRestListsElement)
  public readonly field = inject(BXRestListsField)
  private readonly http = inject(HttpBXServices)

  // getField(pram: getListFieldParam): Observable<iHttpAnswerBX<FieldItemLists[]> | undefined> {
  //     return this.http.post<iHttpAnswerBX<{ [key: string]: FieldItemLists }>>(this.url.field.get, pram)
  // }

  get(param: iBXRestParamListGet){
    return this.http.post<iBXRestListItemHttp[]>(this.url.get, param)
  }
}

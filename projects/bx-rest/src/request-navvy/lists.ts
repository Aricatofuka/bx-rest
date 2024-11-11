import { inject, Injectable } from '@angular/core'
import { BXRestNavvyListsElement } from './lists/element'
import { BXRestLists } from '../request/lists'
import { iBXRestParamListGet } from '../typification/rest/lists/get'
import { Navvy } from '../services/navvy'
import { BXRestMapLists } from '../map/lists'
import BXRestNavvyListsField from './lists/field'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyLists {

  public readonly element = inject(BXRestNavvyListsElement)
  public readonly field = inject(BXRestNavvyListsField)
  protected readonly mapList = inject(BXRestMapLists)
  protected readonly BXRestLists = inject(BXRestLists)

  protected Navvy = new Navvy(this.BXRestLists, this.mapList)

  get(param: iBXRestParamListGet) {
    return this.Navvy.PagNav(this.BXRestLists.get, param, this.mapList.get)
  }

  // getAllWithMap(pram: getListParam): Observable<ItemLists[] | undefined> {
  //     return this.getAll(pram)
  //         .pipe(
  //             map(v => (v && v.length) ? v.map(i => this.listsMap.mapItemLists(i)) : [])
  //         )
  // }

  // getField(pram: getListFieldParam): Observable<iHttpAnswerBX<FieldItemLists[]> | undefined> {
  //     return this.http.post<iHttpAnswerBX<{ [key: string]: FieldItemLists }>>(this.url.field.get, pram)
  // }
}

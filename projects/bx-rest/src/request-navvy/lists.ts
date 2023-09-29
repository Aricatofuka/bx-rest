import { Injectable } from '@angular/core'
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

  protected Navvy: Navvy<BXRestLists, BXRestMapLists>

  constructor(
    public element: BXRestNavvyListsElement,
    public field: BXRestNavvyListsField,
    protected mapList: BXRestMapLists,
    protected BXRestLists: BXRestLists,
  ) {
    this.Navvy = new Navvy(this.BXRestLists, this.mapList)
  }

  get(param: iBXRestParamListGet) {
    return this.Navvy.PagNav(this.BXRestLists.get, param,'Не удалось получить список', this.mapList.get)
  }

  // getAll(pram: getListParam): Observable<ItemListsBX[] | undefined> {
  //     return this.getBase(pram)
  //         .pipe(
  //             mergeMap(items => {
  //                 if (items && items.result) {
  //                     if (items.next) {
  //                         pram.start = items.next
  //                         return this.getAll(pram).pipe(
  //                             map(vEnd => {
  //                                 if (vEnd && items.result) {
  //                                     return [...items.result, ...vEnd]
  //                                 }
  //                                 return (items.result) ? items.result : []
  //                             }))
  //                     }
  //                     return of(items.result)
  //                 } else {
  //                     return []
  //                 }
  //             })
  //         )
  // }

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

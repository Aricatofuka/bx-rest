import { Injectable } from '@angular/core'
import { BXRestNavvyListsElement } from './lists/element'


@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyLists {

  constructor(
    public element: BXRestNavvyListsElement
  ) {
  }

  // constructor(
  //     private http: HttpBXServices,
  //     private listsMap: ListsMapServices
  // ) {
  // }

  // get(pram: iBXRestParamListGet): Observable<ItemLists[] | undefined> {
  //     return this.http.post<iHttpAnswerBX<ItemListsBX[]>>(this.url.get, pram)
  //         .pipe(
  //             map(v => (v && v.length) ? v.map(i => this.listsMap.mapItemLists(i)) : [])
  //         )
  // }

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

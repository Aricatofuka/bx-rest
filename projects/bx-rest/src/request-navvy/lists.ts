import {
  $add,
  $delete,
  $get,
  $iblock,
  $id,
  $lists,
  $type,
  $update
} from '../consts/part-name-metods'
import { Injectable } from '@angular/core'
import { BXRestNavvyListsElement } from './lists/element'

@Injectable({
  providedIn: 'root'
})
export default class BXRestNavvyLists {
  url = {
    add: [$lists, $add], // Метод создаёт список
    delete: [$lists, $delete], // Метод удаляет список
    get: [$lists, $get], // Метод возвращает данные по спискам
    update: [$lists, $update], // Метод обновляет существующий список
    getIblockTypeId: [$lists, $get, $iblock, $type, $id], // Метод возвращает id типа инфоблока
  }

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

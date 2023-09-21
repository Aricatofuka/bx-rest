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
import { BXRestListsElement } from './lists/element'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestListItemHttp, iBXRestParamListGet } from '../typification/rest/lists/get'

@Injectable({
  providedIn: 'root'
})
export class BXRestLists {
  url = {
    add: [$lists, $add], // Метод создаёт список
    delete: [$lists, $delete], // Метод удаляет список
    get: [$lists, $get], // Метод возвращает данные по спискам
    update: [$lists, $update], // Метод обновляет существующий список
    getIblockTypeId: [$lists, $get, $iblock, $type, $id], // Метод возвращает id типа инфоблока
  }

  constructor(
    public element: BXRestListsElement,
    private http: HttpBXServices,
  ) {
  }

  get(pram: iBXRestParamListGet) {
    return this.http.post<iBXRestListItemHttp[]>(this.url.get, pram)
  }

  // getField(pram: getListFieldParam): Observable<iHttpAnswerBX<FieldItemLists[]> | undefined> {
  //     return this.http.post<iHttpAnswerBX<{ [key: string]: FieldItemLists }>>(this.url.field.get, pram)
  // }
}

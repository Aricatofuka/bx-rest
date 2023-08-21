import { $add, $delete, $element, $file, $get, $lists, $update, $url } from '../../consts/part-name-metods'

import HttpBXServices from '../../services/http/HttpBX'
import {
  iBXRestHttpListsElement,
  iBXRestParamListsElementGet
} from '../../typification/rest/lists/element/get'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestListsElement {
  url = {
    add: [$lists, $element, $add], // Метод создаёт элемент списка
    delete: [$lists, $element, $delete], // Метод удаляет элемент списка
    get: [$lists, $element, $get], // Метод возвращает список элементов или элемент
    update: [$lists, $element, $update], //	Метод обновляет элемент списка
    getFileUrl: [$lists, $element, $get, $file, $url]  // Метод возвращает путь к файлу
  }

  constructor(
    private http: HttpBXServices,
    // private mapResult: BXRestListsElementMap
  ) {
  }

  get(pram: iBXRestParamListsElementGet) {
    return this.http.post<iBXRestHttpListsElement[]>(
      this.url.get,
      pram,
      'Не Удалось получить элемент списка'
    )
  }

  customPipe() {

  }

  // add(param: iRestBXParamListsElementAdd) {
  //   return this.http.post<iHttpAnswerBX<number>>(this.url.add, param)
  // }
}

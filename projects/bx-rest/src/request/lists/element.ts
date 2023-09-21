import { $add, $delete, $element, $file, $get, $lists, $update, $url } from '../../consts/part-name-metods'

import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestHttpListsElement,
  iBXRestParamListsElementGet
} from '../../typification/rest/lists/element/get'
import { Injectable } from '@angular/core'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'

@Injectable({
  providedIn: 'root'
})
export class BXRestListsElement {
  url = {
    add: [$lists, $element, $add], // Метод создаёт элемент списка
    delete: [$lists, $element, $delete], // Метод удаляет элемент списка // TODO: Реализовать
    get: [$lists, $element, $get], // Метод возвращает список элементов или элемент
    update: [$lists, $element, $update], //	Метод обновляет элемент списка // TODO: Реализовать
    getFileUrl: [$lists, $element, $get, $file, $url]  // Метод возвращает путь к файлу // TODO: Реализовать
  }

  constructor(
    private http: HttpBXServices,
  ) {
  }

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

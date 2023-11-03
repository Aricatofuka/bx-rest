import { Injectable } from '@angular/core'
import { $add, $delete, $field, $get, $lists, $type, $update } from '../../consts/part-name-methods'
import { iBXRestFieldItem, iBXRestParamListField } from '../../typification/rest/lists/field/get'
import { HttpBXServices } from '../../services/http/HttpBX'

@Injectable({
  providedIn: 'root'
})
export default class BXRestListsField {

  protected url = {
    add: [$lists, $field, $add], // Метод создает поле списка
    delete: [$lists, $field, $delete], // Метод удаляет поле списка
    get: [$lists, $field, $get], // Метод возвращает данные поля
    type: {
      get: [$lists, $field, $type, $get], // Метод возвращает доступные типа полей для указанного списка
    },
    update: [$lists, $field, $update], // Метод обновляет поле списка
  }

  constructor(
    private http: HttpBXServices,
  ) {
  }

  get(param: iBXRestParamListField) {
    return this.http.post<{ [key: string]: iBXRestFieldItem }>(this.url.get, param)
  }

}

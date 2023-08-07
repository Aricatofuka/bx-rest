import { Injectable } from '@angular/core'
import { $add, $delete, $field, $get, $lists, $type, $update } from '../../consts/part-name-metods'

@Injectable({
  providedIn: 'root'
})
export default class BXRestListsField {
  url = {
    add: [$lists, $field, $add], // Метод создает поле списка
    delete: [$lists, $field, $delete], // Метод удаляет поле списка
    get: [$lists, $field, $get], // Метод возвращает данные поля
    type: {
      get: [$lists, $field, $type, $get], // Метод возвращает доступные типа полей для указанного списка
    },
    update: [$lists, $field, $update], // Метод обновляет поле списка
  }
}

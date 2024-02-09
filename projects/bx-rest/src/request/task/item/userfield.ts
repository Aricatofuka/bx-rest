import { Injectable } from '@angular/core'
import { $add, $delete, $get, $item, $task, $update, $userfield } from '../../../consts/part-name-methods'
import {
  iBXRestParamTaskItemUserFieldGetlist,
  iBXRestTaskItemUserFieldGetlistHttp
} from '../../../typification/rest/task/item/userfield/getlist'
import { HttpBXServices } from '../../../services/http/HttpBX'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskItemUserField {

  private url = {
    getFields: [$task, $item, $userfield, 'getfields'], // Получение всех доступных полей свойства
    getTypes: [$task, $item, $userfield, 'gettypes'], // Получение всех доступных типов данных
    add: [ $task, $item, $userfield, $add],	// Создание нового свойства
    get: [ $task, $item, $userfield, $get], // Получение свойства по идентификатору
    getList: [ $task, $item, $userfield, 'getlist'], //	Получение списка свойств
    update: [ $task, $item, $userfield, $update], // Редактирование параметров свойства
    delete: [ $task, $item, $userfield, $delete] //	Удаление свойства.
  }

  constructor(
    private http: HttpBXServices
  ) {
  }

  getList(param: iBXRestParamTaskItemUserFieldGetlist){
    return this.http.post<iBXRestTaskItemUserFieldGetlistHttp[]>(this.url.getList, param)
  }

}
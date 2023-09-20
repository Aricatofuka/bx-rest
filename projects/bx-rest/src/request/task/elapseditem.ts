import { Injectable } from '@angular/core'
import {
  $add, $delete, $elapseditem, $get, $getlist, $getmanifest, $isactionallowed, $task, $update
} from '../../consts/part-name-metods'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamElapseditemGet } from '../../typification/rest/task/elapseditem/get'
import { iBXRestElapseditemHttp } from '../../typification/rest/task/elapseditem/item'
import { iBXRestParamAddElapseditem } from '../../typification/rest/task/elapseditem/add'
import { iBXRestParamUpdateElapseditem } from '../../typification/rest/task/elapseditem/update'
import { iBXRestParamDelElapseditem } from '../../typification/rest/task/elapseditem/del'

@Injectable({
  providedIn: 'root'
})
export class BXRestElapseditem {

  url = {
    getmanifest: [$task, $elapseditem, $getmanifest], // Возвращает список методов и их описание
    getlist: [$task, $elapseditem, $getlist], // Возвращает список записей о затраченном времени по задаче
    get: [$task, $elapseditem, $get], // Возвращает запись о затраченном времени по ее идентификатору
    add: [$task, $elapseditem, $add], // Добавляет затраченное время к задаче
    delete: [$task, $elapseditem, $delete], // Удаляет запись о затраченном времени
    isactionallowed: [$task, $elapseditem, $isactionallowed], // Проверяет разрешено ли действие
    update: [$task, $elapseditem, $update], // Изменяет параметры записи о затраченном времени
  }

  constructor(private http: HttpBXServices) {
  }

  getList(
    params: iBXRestParamElapseditemGet | undefined = undefined
  ) {
    if (params) {
      if (!params.TASKID && !params.SELECT) {
        params.SELECT = ['*']
      }
      if (!params.TASKID && !params.PARAMS) {
        params.PARAMS = {
          NAV_PARAMS: {
            nPageSize: 50,
            iNumPage: 1
          }
        }
      }
    }

    return this.http.post<iBXRestElapseditemHttp[]>(this.url.getlist, params, 'не удалось получить время по задачам')
  }

  add(data: iBXRestParamAddElapseditem) {
    return this.http.post<number>(
      this.url.add,
      data,
      'Не удалось добавить запись о времени',
      {
        timeZone: {
          calc: false,
          levelOut: false
        }
      }
    )
  }

  update(data: iBXRestParamUpdateElapseditem) {
    return this.http.post<null>
    (
      this.url.update,
      data,
      'Не удалось обновить запись о времени',
      {
        timeZone: {
          calc: false,
          levelOut: false
        }
      }
    )
  }

  del(param: iBXRestParamDelElapseditem) {
    return this.http.post<null>(
      this.url.delete,
      {param},
      'Не удалось удалить запись'
    )
  }

}

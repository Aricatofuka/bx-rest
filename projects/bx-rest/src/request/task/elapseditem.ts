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
import { iIsActionAllowedParam } from '../../typification/rest/task/elapseditem/isActionAllowedParam'

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
    param: iBXRestParamElapseditemGet | undefined = undefined
  ) {
    return this.http.post<iBXRestElapseditemHttp[]>(this.url.getlist, param)
  }

  add(param: iBXRestParamAddElapseditem) {
    return this.http.post<number>(
      this.url.add,
      param,
      {
        timeZone: {
          calc: false,
          levelOut: false
        }
      }
    )
  }

  update(param: iBXRestParamUpdateElapseditem) {
    return this.http.post<null>
    (
      this.url.update,
      param,
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
      param
    )
  }

  /**
   * idAction:
   * 1 - ACTION_ELAPSED_TIME_ADD
   * 2 - ACTION_ELAPSED_TIME_MODIFY
   * 3 - ACTION_ELAPSED_TIME_REMOVE
   * ITEMID - обязателен в конечной отправке но не обязателен для ACTION_ELAPSED_TIME_ADD,
   * поэтому этом методе можно ставить "1" например, так же метод может выдавать ошибки о не доступности задачи
   * поэтому рекомендую воспользоваться аналогичным методом в пространстве имен navvy
   * @param param
   */
  isActionAllowed(param: iIsActionAllowedParam) {
    return this.http.post<boolean>(this.url.isactionallowed, param)
  }

}

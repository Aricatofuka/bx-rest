import { Injectable } from '@angular/core'
import {
  $add,
  $commentitem,
  $delete,
  $get,
  $getlist,
  $getmanifest, $isactionallowed,
  $task,
  $update
} from '../../consts/part-name-metods'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamTaskCommentItemGet } from '../../typification/rest/task/commentitem/get'
import { iBXRestTaskCommentHtml } from '../../typification/rest/task/commentitem/commentitem'
import { iBXRestCommentTaskAdd } from '../../typification/rest/task/commentitem/add'
import { iBXRestTaskCommentItemUpdate } from '../../typification/rest/task/commentitem/update'
import { BXRestTaskCommentItemGetList } from '../../typification/rest/task/commentitem/getlist'
import { BXRestTaskCommentItemDelete } from '../../typification/rest/task/commentitem/delete'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskCommentItem {

  protected url = {
    getmanifest: [$task, $commentitem, $getmanifest], // Возвращает список методов и их описание
    getlist: [$task, $commentitem, $getlist], // Возвращает список комментариев к задаче
    get: [$task, $commentitem, $get], // Возвращает комментарий к задаче
    add: [$task, $commentitem, $add], // Создает новый комментарий к задаче
    update: [$task, $commentitem, $update], // Обновляет данные комментария
    delete: [$task, $commentitem, $delete], // Удаляет комментарий
    isactionallowed: [$task, $commentitem, $isactionallowed], // Проверяет, разрешено ли действие
  }

  constructor(
    private http: HttpBXServices,
  ) {
  }

  add(param: iBXRestCommentTaskAdd) {
    return this.http.post<number>(this.url.add, param)
  }

  update(param: iBXRestTaskCommentItemUpdate) {
    return this.http.post<boolean>(this.url.update, param)
  }

  get(param: iBXRestParamTaskCommentItemGet) {
    return this.http.post<iBXRestTaskCommentHtml>(this.url.get, param)
  }

  getlist(param: BXRestTaskCommentItemGetList) {
    return this.http.post<iBXRestTaskCommentHtml[]>(this.url.getlist, param)
  }

  del(param: BXRestTaskCommentItemDelete) {
    return this.http.post<boolean>(this.url.delete, param)
  }
}

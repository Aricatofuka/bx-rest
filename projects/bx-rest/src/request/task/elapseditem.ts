import { HttpBXServices } from '../../services/http/HttpBX'
import {
  iBXRestParamElapseditemGet,
  iBXRestTaskElapsedItemHttp,
  iBXRestParamAddElapseditem,
  iBXRestParamUpdateElapseditem,
  iBXRestParamDelElapseditem,
  iIsActionAllowedParam
} from '../../typification/rest/task'
import {
  $add,
  $delete,
  $elapseditem,
  $getlist,
  $isactionallowed,
  $task,
  $update
} from '../../consts/part-name-methods'


export class BXRestTaskElapsedItem {
  protected url = {
    getList: [$task, $elapseditem, $getlist],
    add: [$task, $elapseditem, $add],
    delete: [$task, $elapseditem, $delete],
    isActionAllowed: [$task, $elapseditem, $isactionallowed],
    update: [$task, $elapseditem, $update],
  }
  private readonly http = new HttpBXServices()

  getList(param: iBXRestParamElapseditemGet = {}) {
    return this.http.post<iBXRestTaskElapsedItemHttp[]>(this.url.getList, param)
  }

  add(param: iBXRestParamAddElapseditem) {
    return this.http.post<number>(
      this.url.add,
      param
    )
  }

  update(param: iBXRestParamUpdateElapseditem) {
    return this.http.post<null>
    (
      this.url.update,
      param
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
    return this.http.post<boolean>(this.url.isActionAllowed, param)
  }

}

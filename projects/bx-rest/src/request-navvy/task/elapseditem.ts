import { iBXRestParamElapseditemGet } from '../../typification/rest/task/elapseditem/get'
import { iBXRestParamAddElapseditem } from '../../typification/rest/task/elapseditem/add'
import { iBXRestParamUpdateElapseditem } from '../../typification/rest/task/elapseditem/update'
import { iIsActionAllowedParam } from '../../typification/rest/task/elapseditem/isActionAllowedParam'
import { iBXRestParamDelElapseditem } from '../../typification/rest/task/elapseditem/del'
import { Navvy } from '../../services/navvy'
import { BXRestNavvyOperationElapsedItem } from './operation/elapseditem'
import { BXRestNavvyDelegateElapsedItem } from './delegate/elapseditem'
import { $add, $delete, $elapseditem, $getlist, $isactionallowed, $task, $update } from '../../consts/part-name-methods'

export class BXRestNavvyElapsedItem {
  protected url = {
    // /**
    //  * Возвращает список методов и их описание
    //  */
    // getManifest: [$task, $elapseditem, $getmanifest],
    /**
     * Возвращает список записей о затраченном времени по задаче
     */
    getList: [$task, $elapseditem, $getlist],
    // /**
    //  * Возвращает запись о затраченном времени по ее идентификатору
    //  */
    // get: [$task, $elapseditem, $get],
    /**
     * Добавляет затраченное время к задаче
     */
    add: [$task, $elapseditem, $add],
    /**
     * Удаляет запись о затраченном времени
     */
    delete: [$task, $elapseditem, $delete],
    /**
     * Проверяет разрешено ли действие
     */
    isActionAllowed: [$task, $elapseditem, $isactionallowed],
    /**
     * Изменяет параметры записи о затраченном времени
     */
    update: [$task, $elapseditem, $update],
  }
  private readonly delegate = new BXRestNavvyDelegateElapsedItem()
  public readonly operation = new BXRestNavvyOperationElapsedItem(this)

  private readonly Navvy = new Navvy()

  getList(
    param: iBXRestParamElapseditemGet = {}
  ) {
    return this.delegate.getList(param)
  }

  add(param: iBXRestParamAddElapseditem) {
    return this.Navvy.simple<number, number, iBXRestParamAddElapseditem>(this.url.add, param)
  }

  /**
   * Обновление записи рабочего времени
   *
   * @param param
   */
  update(param: iBXRestParamUpdateElapseditem) {
    return this.Navvy.simple<null, null, iBXRestParamUpdateElapseditem>(this.url.update, param)
  }

  /**
   * idAction:
   * 1 - ACTION_ELAPSED_TIME_ADD
   * 2 - ACTION_ELAPSED_TIME_MODIFY
   * 3 - ACTION_ELAPSED_TIME_REMOVE
   * @param param
   */
  isActionAllowed(param: iIsActionAllowedParam) {
    return this.Navvy.simple<boolean, boolean, iIsActionAllowedParam>(this.url.isActionAllowed, param)
  }

  delete(param: iBXRestParamDelElapseditem) {
    return this.Navvy.simple<null, null, iBXRestParamDelElapseditem>(this.url.delete, param)
  }

}

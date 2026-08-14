import { Navvy } from '../../../services/navvy'
import { BXRestMapTaskUserField } from '../../../map/task/item/userfield'
import {
  iBXRestParamTaskItemUserFieldAdd,
  iBXRestParamTaskItemUserFieldGetlist,
  iBXRestParamTaskItemUserFieldId,
  iBXRestParamTaskItemUserFieldUpdate,
  iBXRestTaskItemUserFieldGetlist,
  iBXRestTaskItemUserFieldGetlistHttp,
  iBXRestTaskObject
} from '../../../typification/rest/task'
import { $add, $delete, $get, $getFields, $getlist, $gettypes, $item, $task, $update, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyTaskItemUserField {

  protected url = {
    /**
     * Получение всех доступных полей свойства
     */
    getFields: [$task, $item, $userfield, $getFields],
    // /**
    //  * Получение всех доступных типов данных
    //  */
    // getTypes: [$task, $item, $userfield, 'gettypes'],
    // /**
    //  * Создание нового свойства
    //  */
    // add: [$task, $item, $userfield, $add],
    // /**
    //  * Получение свойства по идентификатору
    //  */
    // get: [$task, $item, $userfield, $get],
    /**
     * Получение списка свойств
     */
    getList: [$task, $item, $userfield, $getlist],
    // /**
    //  * Редактирование параметров свойства
    //  */
    // update: [$task, $item, $userfield, $update],
    // /**
    //  * Удаление свойства
    //  */
    // delete: [$task, $item, $userfield, $delete]
  }

  private readonly Navvy = new Navvy()

  /**
   * Возвращает список пользовательских полей задачи.
   */
  getList(param: iBXRestParamTaskItemUserFieldGetlist = {}){
    return this.Navvy.pagNav<iBXRestTaskItemUserFieldGetlistHttp, iBXRestTaskItemUserFieldGetlist, iBXRestParamTaskItemUserFieldGetlist>(
      this.url.getList,
      param,
      BXRestMapTaskUserField.getList
    )
  }

  /**
   * Создаёт новое пользовательское поле задачи.
   */
  add(param: iBXRestParamTaskItemUserFieldAdd) {
    return this.Navvy.simple<number, number, iBXRestParamTaskItemUserFieldAdd>(
      [$task, $item, $userfield, $add],
      param
    )
  }

  /**
   * Удаляет пользовательское поле задачи.
   */
  delete(param: iBXRestParamTaskItemUserFieldId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskItemUserFieldId>(
      [$task, $item, $userfield, $delete],
      param
    )
  }

  /**
   * Возвращает пользовательское поле задачи по идентификатору.
   */
  get(param: iBXRestParamTaskItemUserFieldId) {
    return this.Navvy.simple<
      iBXRestTaskObject,
      iBXRestTaskObject,
      iBXRestParamTaskItemUserFieldId
    >([$task, $item, $userfield, $get], param)
  }

  /**
   * Возвращает доступные поля пользовательского поля задачи.
   */
  getFields() {
    return this.Navvy.simple<iBXRestTaskObject>([$task, $item, $userfield, $getFields])
  }

  /**
   * Возвращает все доступные типы данных пользовательских полей.
   */
  getTypes() {
    return this.Navvy.simple<iBXRestTaskObject>([$task, $item, $userfield, $gettypes])
  }

  /**
   * Обновляет параметры пользовательского поля задачи.
   */
  update(param: iBXRestParamTaskItemUserFieldUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskItemUserFieldUpdate>(
      [$task, $item, $userfield, $update],
      param
    )
  }
}

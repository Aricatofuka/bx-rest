import { Navvy } from '../../../services/navvy'
import { BXRestMapTaskUserField } from '../../../map/task/item/userfield'
import {
  iBXRestParamTaskItemUserFieldGetlist, iBXRestTaskItemUserFieldGetlist, iBXRestTaskItemUserFieldGetlistHttp
} from '../../../typification/rest/task/item/userfield/getlist'
import { $item, $task, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyTaskItemUserField {

  protected url = {
    /**
     * Получение всех доступных полей свойства
     */
    getFields: [$task, $item, $userfield, 'getfields'],
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
    getList: [$task, $item, $userfield, 'getlist'],
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

  getList(param: iBXRestParamTaskItemUserFieldGetlist = {}){
    return this.Navvy.pagNav<iBXRestTaskItemUserFieldGetlistHttp, iBXRestTaskItemUserFieldGetlist, iBXRestParamTaskItemUserFieldGetlist>(
      this.url.getList,
      param,
      BXRestMapTaskUserField.getList
    )
  }
}
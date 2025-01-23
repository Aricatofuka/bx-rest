import {
  BXRestHttpListsFieldGet,
  iBXRestParamListField
} from '../../typification/rest/lists/field/get'
import { HttpBXServices } from '../../services/http/HttpBX'
import { $field, $get, $lists } from '../../consts/part-name-methods'

export class BXRestListsField {
  protected readonly url = {
    // /**
    //  * Метод создает поле списка
    //  */
    // add: [$lists, $field, $add],
    // /**
    //  * Метод удаляет поле списка
    //  */
    // delete: [$lists, $field, $delete],
    /**
     * Метод возвращает данные поля
     */
    get: [$lists, $field, $get],
    // type: {
    //   /**
    //    * Метод возвращает доступные типа полей для указанного списка
    //    */
    //   get: [$lists, $field, $type, $get],
    // },
    // /**
    //  * Метод обновляет поле списка
    //  */
    // update: [$lists, $field, $update],
  }
  private readonly http = new HttpBXServices()

  get(param: iBXRestParamListField) {
    return this.http.post<BXRestHttpListsFieldGet>(this.url.get, param)
  }

}

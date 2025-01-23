import { iBXRestFieldItem, iBXRestParamListField } from '../../typification/rest/lists/field/get'
import { Navvy } from '../../services/navvy'
import { BXRestMapListsField } from '../../map/lists/field'
import { $field, $get, $lists } from '../../consts/part-name-methods'

export default class BXRestNavvyListsField {
  url = {
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

  private Navvy = new Navvy()

  get(param: iBXRestParamListField) {
    return this.Navvy.PagNavWithUselessKey<iBXRestFieldItem,iBXRestFieldItem,iBXRestParamListField>(
      this.url.get,
      param,
      BXRestMapListsField.get
    )
  }
}

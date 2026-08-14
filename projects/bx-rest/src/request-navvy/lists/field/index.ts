import { $add, $delete, $field, $get, $lists, $update } from '../../../consts/part-name-methods'
import { BXRestMapListsField } from '../../../map/lists/field'
import { Navvy } from '../../../services/navvy'
import { iBXRestFieldItem, iBXRestParamListField, iBXRestParamListsFieldAdd, iBXRestParamListsFieldDelete, iBXRestParamListsFieldUpdate } from '../../../typification/rest/lists'
import { BXRestNavvyListsFieldType } from './type'

export default class BXRestNavvyListsField {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$lists, $field, $add],
    delete: [$lists, $field, $delete],
    get: [$lists, $field, $get],
    update: [$lists, $field, $update]
  }

  /**
   * Типы полей универсального списка (`lists.field.type.*`).
   */
  public readonly type = new BXRestNavvyListsFieldType()

  /**
   * Создаёт поле списка.
   */
  add(param: iBXRestParamListsFieldAdd) {
    return this.Navvy.simple<string, string, iBXRestParamListsFieldAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Удаляет поле списка.
   */
  delete(param: iBXRestParamListsFieldDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsFieldDelete>(
      this.url.delete,
      param
    )
  }

  /**
   * Возвращает данные поля.
   */
  get(param: iBXRestParamListField) {
    return this.Navvy.pagNavWithUselessKey<
      iBXRestFieldItem,
      iBXRestFieldItem,
      iBXRestParamListField
    >(this.url.get, param, BXRestMapListsField.get)
  }

  /**
   * Обновляет поле списка.
   */
  update(param: iBXRestParamListsFieldUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsFieldUpdate>(
      this.url.update,
      param
    )
  }
}


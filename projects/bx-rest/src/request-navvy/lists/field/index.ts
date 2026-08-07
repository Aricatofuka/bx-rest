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

  public readonly type = new BXRestNavvyListsFieldType()

  add(param: iBXRestParamListsFieldAdd) {
    return this.Navvy.simple<string, string, iBXRestParamListsFieldAdd>(
      this.url.add,
      param
    )
  }

  delete(param: iBXRestParamListsFieldDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsFieldDelete>(
      this.url.delete,
      param
    )
  }

  get(param: iBXRestParamListField) {
    return this.Navvy.pagNavWithUselessKey<
      iBXRestFieldItem,
      iBXRestFieldItem,
      iBXRestParamListField
    >(this.url.get, param, BXRestMapListsField.get)
  }

  update(param: iBXRestParamListsFieldUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamListsFieldUpdate>(
      this.url.update,
      param
    )
  }
}


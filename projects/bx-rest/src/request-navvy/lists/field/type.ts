import { $field, $get, $lists, $type } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamListsFieldTypeGet } from '../../../typification/rest/lists'

export class BXRestNavvyListsFieldType {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$lists, $field, $type, $get]
  }

  get(param: iBXRestParamListsFieldTypeGet) {
    return this.Navvy.simple<
      Record<string, string>,
      Record<string, string>,
      iBXRestParamListsFieldTypeGet
    >(this.url.get, param)
  }
}


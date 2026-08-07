import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $collection, $field, $get, $list, $note } from '../../../consts/part-name-methods'

export class BXRestNavvyNoteCollectionField  {
  private readonly Navvy = new Navvy()

  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $field, $get], param)
  }

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$note, $collection, $field, $list], param)
  }
}


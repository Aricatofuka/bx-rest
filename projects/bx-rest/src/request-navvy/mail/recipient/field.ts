import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $field, $get, $list, $mail, $recipient } from '../../../consts/part-name-methods'

export class BXRestNavvyMailRecipientField  {
  private readonly Navvy = new Navvy()

  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $recipient, $field, $get], param)
  }

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $recipient, $field, $list], param)
  }
}


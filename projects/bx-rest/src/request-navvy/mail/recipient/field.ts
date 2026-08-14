import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $field, $get, $list, $mail, $recipient } from '../../../consts/part-name-methods'

export class BXRestNavvyMailRecipientField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля получателя.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $recipient, $field, $get], param)
  }

  /**
   * Возвращает список полей получателя.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $recipient, $field, $list], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $field, $get, $list, $mail, $mailbox } from '../../../consts/part-name-methods'

export class BXRestNavvyMailMailboxField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля почтового ящика.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $field, $get], param)
  }

  /**
   * Возвращает список полей почтового ящика.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $field, $list], param)
  }
}


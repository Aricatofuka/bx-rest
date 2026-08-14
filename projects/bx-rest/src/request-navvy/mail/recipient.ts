import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $listcontacts, $listemployees, $mail, $recipient } from '../../consts/part-name-methods'
import { BXRestNavvyMailRecipientField } from './recipient/field'

export class BXRestNavvyMailRecipient  {
  private readonly Navvy = new Navvy()

  /**
   * Поля получателя (`mail.recipient.field.*`).
   */
  public readonly field = new BXRestNavvyMailRecipientField()

  /**
   * Ищет контакты из адресной книги.
   */
  listcontacts(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $recipient, $listcontacts], param)
  }

  /**
   * Ищет сотрудников по имени или e-mail.
   */
  listemployees(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $recipient, $listemployees], param)
  }
}


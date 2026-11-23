import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import {
  iBXRestMailFieldSelect,
  iBXRestMailRecipientSelect,
  iBXRestParamMailFieldGet
} from '../../../typification/rest/mail'
import { $field, $get, $list, $mail, $recipient } from '../../../consts/part-name-methods'

export class BXRestNavvyMailRecipientField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля получателя
   * @see https://apidocs.bitrix24.ru/api-reference/mail/recipient/mail-recipient-field-get.html
   */
  get(param: iBXRestParamMailFieldGet<
    iBXRestMailRecipientSelect,
    iBXRestMailFieldSelect
  >) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamMailFieldGet<
        iBXRestMailRecipientSelect,
        iBXRestMailFieldSelect
      >
    >([$mail, $recipient, $field, $get], param)
  }

  /**
   * Возвращает список полей получателя
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $recipient, $field, $list], param)
  }
}

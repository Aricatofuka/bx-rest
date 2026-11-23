import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamMailFieldGet } from '../../../typification/rest/mail'
import { $field, $get, $list, $mail, $message } from '../../../consts/part-name-methods'

export class BXRestNavvyMailMessageField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля письма
   * @see https://apidocs.bitrix24.ru/api-reference/mail/message/mail-message-field-get.html
   */
  get(param: iBXRestParamMailFieldGet) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamMailFieldGet
    >([$mail, $message, $field, $get], param)
  }

  /**
   * Возвращает список полей письма
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $field, $list], param)
  }
}

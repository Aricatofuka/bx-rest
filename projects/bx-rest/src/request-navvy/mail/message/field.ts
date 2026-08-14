import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $field, $get, $list, $mail, $message } from '../../../consts/part-name-methods'

export class BXRestNavvyMailMessageField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля письма.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $field, $get], param)
  }

  /**
   * Возвращает список полей письма.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $message, $field, $list], param)
  }
}


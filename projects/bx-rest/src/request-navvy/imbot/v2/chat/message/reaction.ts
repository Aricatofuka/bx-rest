import { Navvy } from '../../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../../typification/rest/common'
import { $Chat, $add, $delete, $imbot, $message, $reaction, $v2 } from '../../../../../consts/part-name-methods'

export class BXRestNavvyImBotV2ChatMessageReaction  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет реакцию на сообщение.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $reaction, $add], param)
  }

  /**
   * Удаляет реакцию с сообщения.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $message, $reaction, $delete], param)
  }
}


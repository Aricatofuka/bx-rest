import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $Chat, $enabled, $imbot, $textField, $v2 } from '../../../../consts/part-name-methods'

export class BXRestNavvyImBotV2ChatTextField  {
  private readonly Navvy = new Navvy()

  /**
   * Включает или отключает поле ввода текста в чате.
   */
  enabled(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $textField, $enabled], param)
  }
}


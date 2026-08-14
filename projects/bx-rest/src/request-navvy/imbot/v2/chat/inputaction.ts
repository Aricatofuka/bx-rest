import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $Chat, $imbot, $inputAction, $notify, $v2 } from '../../../../consts/part-name-methods'

export class BXRestNavvyImBotV2ChatInputAction  {
  private readonly Navvy = new Navvy()

  /**
   * Показывает индикатор действия бота в чате.
   */
  notify(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $inputAction, $notify], param)
  }
}


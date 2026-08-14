import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $Chat, $add, $delete, $imbot, $manager, $v2 } from '../../../../consts/part-name-methods'

export class BXRestNavvyImBotV2ChatManager  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет менеджеров чата.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $manager, $add], param)
  }

  /**
   * Удаляет менеджеров чата.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $manager, $delete], param)
  }
}


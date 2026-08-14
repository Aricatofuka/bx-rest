import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $Chat, $add, $delete, $imbot, $list, $user, $v2 } from '../../../../consts/part-name-methods'

export class BXRestNavvyImBotV2ChatUser  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет участников в чат.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $user, $add], param)
  }

  /**
   * Удаляет участника из чата.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $user, $delete], param)
  }

  /**
   * Возвращает список участников чата.
   */
  list(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Chat, $user, $list], param)
  }
}


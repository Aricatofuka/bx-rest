import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $add, $chat, $crm, $delete, $imopenlines, $user } from '../../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesCrmChatUser  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет пользователя в существующий CRM-чат.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $chat, $user, $add], param)
  }

  /**
   * Удаляет пользователя из CRM-чата.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $chat, $user, $delete], param)
  }
}


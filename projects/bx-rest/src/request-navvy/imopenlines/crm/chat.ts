import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $chat, $crm, $get, $getLastId, $imopenlines } from '../../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesCrmChatUser } from './chat/user'

export class BXRestNavvyImOpenLinesCrmChat  {
  private readonly Navvy = new Navvy()

  /**
   * Участники CRM-чата (`imopenlines.crm.chat.user.*`).
   */
  public readonly user = new BXRestNavvyImOpenLinesCrmChatUser()

  /**
   * Возвращает чат по объекту CRM.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $chat, $get], param)
  }

  /**
   * Возвращает идентификатор последнего CRM-чата.
   */
  getLastId(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $chat, $getLastId], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $chat, $crm, $get, $getLastId, $imopenlines } from '../../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesCrmChatUser } from './chat/user'

export class BXRestNavvyImOpenLinesCrmChat  {
  private readonly Navvy = new Navvy()

  public readonly user = new BXRestNavvyImOpenLinesCrmChatUser()

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $chat, $get], param)
  }

  getLastId(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $chat, $getLastId], param)
  }
}


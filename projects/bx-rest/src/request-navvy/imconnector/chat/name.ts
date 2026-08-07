import { Navvy } from '../../../services/navvy'
import { iBXRestGenericParams } from '../../../typification/rest/common'
import { $chat, $imconnector, $name, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyImConnectorChatName  {
  private readonly Navvy = new Navvy()

  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $chat, $name, $set], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericParams } from '../../typification/rest/common'
import { $imconnector, $messages, $update } from '../../consts/part-name-methods'

export class BXRestNavvyImConnectorUpdate  {
  private readonly Navvy = new Navvy()

  messages(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $update, $messages], param)
  }
}


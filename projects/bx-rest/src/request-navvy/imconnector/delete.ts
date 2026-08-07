import { Navvy } from '../../services/navvy'
import { iBXRestGenericParams } from '../../typification/rest/common'
import { $delete, $imconnector, $messages } from '../../consts/part-name-methods'

export class BXRestNavvyImConnectorDelete  {
  private readonly Navvy = new Navvy()

  messages(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $delete, $messages], param)
  }
}


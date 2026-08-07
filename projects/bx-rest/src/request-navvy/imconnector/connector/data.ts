import { Navvy } from '../../../services/navvy'
import { iBXRestGenericParams } from '../../../typification/rest/common'
import { $connector, $data, $imconnector, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyImConnectorConnectorData  {
  private readonly Navvy = new Navvy()

  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$imconnector, $connector, $data, $set], param)
  }
}


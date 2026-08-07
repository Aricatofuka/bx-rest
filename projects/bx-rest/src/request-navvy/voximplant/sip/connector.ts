import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $connector, $sip, $status, $voximplant } from '../../../consts/part-name-methods'

export class BXRestNavvyVoxImplantSipConnector  {
  private readonly Navvy = new Navvy()

  status(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $sip, $connector, $status], param)
  }
}


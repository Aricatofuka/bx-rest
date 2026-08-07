import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $infocall, $startwithsound, $startwithtext, $voximplant } from '../../consts/part-name-methods'

export class BXRestNavvyVoxImplantInfoCall  {
  private readonly Navvy = new Navvy()

  startwithsound(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $infocall, $startwithsound], param)
  }

  startwithtext(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $infocall, $startwithtext], param)
  }
}


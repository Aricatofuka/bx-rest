import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $attachRecord, $externalCall, $finish, $hide, $register, $searchCrmEntities, $show, $telephony } from '../../consts/part-name-methods'

export class BXRestNavvyTelephonyExternalCall  {
  private readonly Navvy = new Navvy()

  attachRecord(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $attachRecord], param)
  }

  finish(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $finish], param)
  }

  hide(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $hide], param)
  }

  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$telephony, $externalCall, $register], param)
  }

  searchCrmEntities(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$telephony, $externalCall, $searchCrmEntities], param)
  }

  show(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$telephony, $externalCall, $show], param)
  }
}


import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $booking, $list, $resource, $set, $slots, $unset, $v1 } from '../../../../consts/part-name-methods'

export class BXRestNavvyBookingV1ResourceSlots  {
  private readonly Navvy = new Navvy()

  list(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $slots, $list], param)
  }

  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $slots, $set], param)
  }

  unset(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $slots, $unset], param)
  }
}


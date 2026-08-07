import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $booking, $createfromwaitlist, $delete, $get, $list, $update, $v1 } from '../../../consts/part-name-methods'
import { BXRestNavvyBookingV1BookingClient } from './booking/client'
import { BXRestNavvyBookingV1BookingExternalData } from './booking/externaldata'

export class BXRestNavvyBookingV1Booking  {
  private readonly Navvy = new Navvy()

  public readonly client = new BXRestNavvyBookingV1BookingClient()
  public readonly externalData = new BXRestNavvyBookingV1BookingExternalData()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $add], param)
  }

  createFromWaitlist(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $createfromwaitlist], param)
  }

  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $delete], param)
  }

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $get], param)
  }

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $list], param)
  }

  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $update], param)
  }
}


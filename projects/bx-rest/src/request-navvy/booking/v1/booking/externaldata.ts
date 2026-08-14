import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $booking, $externaldata, $list, $set, $unset, $v1 } from '../../../../consts/part-name-methods'

export class BXRestNavvyBookingV1BookingExternalData  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает связи бронирования с внешними системами.
   */
  list(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $externaldata, $list], param)
  }

  /**
   * Устанавливает связи для бронирования с внешними системами.
   */
  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $externaldata, $set], param)
  }

  /**
   * Удаляет связи для бронирования с внешними системами.
   */
  unset(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $externaldata, $unset], param)
  }
}


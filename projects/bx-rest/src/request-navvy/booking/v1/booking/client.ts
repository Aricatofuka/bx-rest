import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $booking, $client, $list, $set, $unset, $v1 } from '../../../../consts/part-name-methods'

export class BXRestNavvyBookingV1BookingClient  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список клиентов бронирования.
   */
  list(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $client, $list], param)
  }

  /**
   * Добавляет клиентов к бронированию.
   */
  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $client, $set], param)
  }

  /**
   * Удаляет клиентов из бронирования.
   */
  unset(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $client, $unset], param)
  }
}


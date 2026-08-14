import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $booking, $createfromwaitlist, $delete, $get, $list, $update, $v1 } from '../../../consts/part-name-methods'
import { BXRestNavvyBookingV1BookingClient } from './booking/client'
import { BXRestNavvyBookingV1BookingExternalData } from './booking/externaldata'

export class BXRestNavvyBookingV1Booking  {
  private readonly Navvy = new Navvy()

  /**
   * Клиенты бронирования (`booking.v1.booking.client.*`).
   */
  public readonly client = new BXRestNavvyBookingV1BookingClient()
  /**
   * Связи бронирования с внешними системами (`booking.v1.booking.externalData.*`).
   */
  public readonly externalData = new BXRestNavvyBookingV1BookingExternalData()

  /**
   * Добавляет бронирование.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $add], param)
  }

  /**
   * Создаёт бронирование из записи в листе ожидания.
   */
  createFromWaitlist(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $createfromwaitlist], param)
  }

  /**
   * Удаляет бронирование.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $delete], param)
  }

  /**
   * Возвращает информацию о бронировании.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $get], param)
  }

  /**
   * Возвращает список бронирований.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $list], param)
  }

  /**
   * Обновляет бронирование.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $booking, $update], param)
  }
}


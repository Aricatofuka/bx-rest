import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $booking, $createfrombooking, $delete, $get, $list, $update, $v1, $waitlist } from '../../../consts/part-name-methods'
import { BXRestNavvyBookingV1WaitlistClient } from './waitlist/client'
import { BXRestNavvyBookingV1WaitlistExternalData } from './waitlist/externaldata'

export class BXRestNavvyBookingV1Waitlist  {
  private readonly Navvy = new Navvy()

  /**
   * Клиенты записи в лист ожидания (`booking.v1.waitlist.client.*`).
   */
  public readonly client = new BXRestNavvyBookingV1WaitlistClient()
  /**
   * Связи записи в лист ожидания с внешними системами (`booking.v1.waitlist.externalData.*`).
   */
  public readonly externalData = new BXRestNavvyBookingV1WaitlistExternalData()

  /**
   * Добавляет запись в лист ожидания.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $add], param)
  }

  /**
   * Создаёт запись в листе ожидания из бронирования.
   */
  createFromBooking(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $createfrombooking], param)
  }

  /**
   * Удаляет запись из листа ожидания.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $delete], param)
  }

  /**
   * Возвращает запись из листа ожидания.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $get], param)
  }

  /**
   * Возвращает список записей из листа ожидания.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $list], param)
  }

  /**
   * Обновляет запись в листе ожидания.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $update], param)
  }
}


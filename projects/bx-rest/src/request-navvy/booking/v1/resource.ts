import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamBookingV1ResourceGet } from '../../../typification/rest/booking'
import { $add, $booking, $delete, $get, $list, $resource, $update, $v1 } from '../../../consts/part-name-methods'
import { BXRestNavvyBookingV1ResourceSlots } from './resource/slots'

export class BXRestNavvyBookingV1Resource  {
  private readonly Navvy = new Navvy()

  /**
   * Слоты ресурса (`booking.v1.resource.slots.*`).
   */
  public readonly slots = new BXRestNavvyBookingV1ResourceSlots()

  /**
   * Добавляет новый ресурс
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $add], param)
  }

  /**
   * Удаляет ресурс
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $delete], param)
  }

  /**
   * Возвращает ресурс
   * @see https://apidocs.bitrix24.ru/api-reference/booking/resource/booking-v1-resource-get.html
   */
  get(param: iBXRestParamBookingV1ResourceGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamBookingV1ResourceGet
    >([$booking, $v1, $resource, $get], param)
  }

  /**
   * Возвращает список ресурсов
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $list], param, 'resource')
  }

  /**
   * Обновляет ресурс
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $update], param)
  }
}

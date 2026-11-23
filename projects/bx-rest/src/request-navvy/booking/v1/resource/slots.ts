import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { iBXRestParamBookingV1ResourceSlotsList } from '../../../../typification/rest/booking'
import { $booking, $list, $resource, $set, $slots, $unset, $v1 } from '../../../../consts/part-name-methods'

export class BXRestNavvyBookingV1ResourceSlots  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает настройку слотов для ресурса
   * @see https://apidocs.bitrix24.ru/api-reference/booking/resource/slots/booking-v1-resource-slots-list.html
   */
  list(param: iBXRestParamBookingV1ResourceSlotsList) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamBookingV1ResourceSlotsList
    >([$booking, $v1, $resource, $slots, $list], param)
  }

  /**
   * Устанавливает слоты для ресурса
   */
  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $slots, $set], param)
  }

  /**
   * Удаляет слоты для ресурса
   */
  unset(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $slots, $unset], param)
  }
}

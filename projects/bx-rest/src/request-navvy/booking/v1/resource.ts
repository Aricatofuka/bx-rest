import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $booking, $delete, $get, $list, $resource, $update, $v1 } from '../../../consts/part-name-methods'
import { BXRestNavvyBookingV1ResourceSlots } from './resource/slots'

export class BXRestNavvyBookingV1Resource  {
  private readonly Navvy = new Navvy()

  /**
   * Слоты ресурса (`booking.v1.resource.slots.*`).
   */
  public readonly slots = new BXRestNavvyBookingV1ResourceSlots()

  /**
   * Добавляет новый ресурс.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $add], param)
  }

  /**
   * Удаляет ресурс.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $delete], param)
  }

  /**
   * Возвращает ресурс.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $get], param)
  }

  /**
   * Возвращает список ресурсов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $list], param)
  }

  /**
   * Обновляет ресурс.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $resource, $update], param)
  }
}


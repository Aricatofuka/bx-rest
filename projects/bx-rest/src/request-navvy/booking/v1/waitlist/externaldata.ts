import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $booking, $externaldata, $list, $set, $unset, $v1, $waitlist } from '../../../../consts/part-name-methods'

export class BXRestNavvyBookingV1WaitlistExternalData  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает связи записи в лист ожидания с внешними системами.
   */
  list(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $externaldata, $list], param)
  }

  /**
   * Устанавливает связи для записи в лист ожидания с внешними системами.
   */
  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $externaldata, $set], param)
  }

  /**
   * Удаляет связи для записи в лист ожидания с внешними системами.
   */
  unset(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $externaldata, $unset], param)
  }
}


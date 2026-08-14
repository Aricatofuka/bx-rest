import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $booking, $clienttype, $list, $v1 } from '../../../consts/part-name-methods'

export class BXRestNavvyBookingV1ClientType  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список типов клиентов.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $clienttype, $list], param)
  }
}


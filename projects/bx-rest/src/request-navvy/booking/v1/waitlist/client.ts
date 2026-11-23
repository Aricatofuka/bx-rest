import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { iBXRestParamBookingV1WaitlistClientList } from '../../../../typification/rest/booking'
import { $booking, $client, $list, $set, $unset, $v1, $waitlist } from '../../../../consts/part-name-methods'

export class BXRestNavvyBookingV1WaitlistClient  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список клиентов записи в лист ожидания
   * @see https://apidocs.bitrix24.ru/api-reference/booking/waitlist/client/booking-v1-waitlist-client-list.html
   */
  list(param: iBXRestParamBookingV1WaitlistClientList) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamBookingV1WaitlistClientList
    >([$booking, $v1, $waitlist, $client, $list], param)
  }

  /**
   * Добавляет клиентов к записи в лист ожидания
   */
  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $client, $set], param)
  }

  /**
   * Удаляет клиентов из записи в лист ожидания
   */
  unset(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$booking, $v1, $waitlist, $client, $unset], param)
  }
}

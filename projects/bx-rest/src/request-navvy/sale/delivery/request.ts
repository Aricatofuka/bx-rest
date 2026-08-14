import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $delete, $delivery, $request, $sale, $sendMessage, $update } from '../../../consts/part-name-methods'

export class BXRestNavvySaleDeliveryRequest  {
  private readonly Navvy = new Navvy()

  /**
   * Удаляет запрос на расчёт доставки.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $request, $delete], param)
  }
  /**
   * Отправляет сообщение по запросу на доставку.
   */
  public sendMessage(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $request, $sendMessage], param)
  }
  /**
   * Обновляет запрос на расчёт доставки.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $request, $update], param)
  }
}


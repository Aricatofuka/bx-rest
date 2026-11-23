import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamSaleDeliveryConfigGet } from '../../../typification/rest/sale'
import { $config, $delivery, $get, $sale, $update } from '../../../consts/part-name-methods'

export class BXRestNavvySaleDeliveryConfig  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает настройки службы доставки
   * @see https://apidocs.bitrix24.ru/api-reference/sale/delivery/delivery/sale-delivery-config-get.html
   */
  public get(param: iBXRestParamSaleDeliveryConfigGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamSaleDeliveryConfigGet
    >([$sale, $delivery, $config, $get], param)
  }
  /**
   * Обновляет настройки службы доставки
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $config, $update], param)
  }
}

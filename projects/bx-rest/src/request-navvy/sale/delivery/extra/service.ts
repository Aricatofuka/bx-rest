import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { iBXRestParamSaleDeliveryExtraServiceGet } from '../../../../typification/rest/sale'
import { $add, $delete, $delivery, $extra, $get, $sale, $service, $update } from '../../../../consts/part-name-methods'

export class BXRestNavvySaleDeliveryExtraService  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет дополнительную услугу службы доставки
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $extra, $service, $add], param)
  }
  /**
   * Удаляет дополнительную услугу службы доставки
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $extra, $service, $delete], param)
  }
  /**
   * Возвращает дополнительную услугу службы доставки
   * @see https://apidocs.bitrix24.ru/api-reference/sale/delivery/extra-service/sale-delivery-extra-service-get.html
   */
  public get(param: iBXRestParamSaleDeliveryExtraServiceGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamSaleDeliveryExtraServiceGet
    >([$sale, $delivery, $extra, $service, $get], param)
  }
  /**
   * Обновляет дополнительную услугу службы доставки
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $extra, $service, $update], param)
  }
}

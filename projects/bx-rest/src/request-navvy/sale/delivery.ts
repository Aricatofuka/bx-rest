import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $delivery, $getList, $sale, $update } from '../../consts/part-name-methods'
import { BXRestNavvySaleDeliveryConfig } from './delivery/config'
import { BXRestNavvySaleDeliveryExtra } from './delivery/extra'
import { BXRestNavvySaleDeliveryHandler } from './delivery/handler'
import { BXRestNavvySaleDeliveryRequest } from './delivery/request'

export class BXRestNavvySaleDelivery  {
  private readonly Navvy = new Navvy()

  /**
   * Настройки службы доставки (`sale.delivery.config.*`).
   */
  public readonly config = new BXRestNavvySaleDeliveryConfig()
  /**
   * Дополнительные услуги службы доставки (`sale.delivery.extra.*`).
   */
  public readonly extra = new BXRestNavvySaleDeliveryExtra()
  /**
   * Обработчики служб доставки (`sale.delivery.handler.*`).
   */
  public readonly handler = new BXRestNavvySaleDeliveryHandler()
  /**
   * Запросы на расчёт доставки (`sale.delivery.request.*`).
   */
  public readonly request = new BXRestNavvySaleDeliveryRequest()
  /**
   * Добавляет службу доставки.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $add], param)
  }
  /**
   * Удаляет службу доставки.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $delete], param)
  }
  /**
   * Возвращает список служб доставки.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $getList], param)
  }
  /**
   * Обновляет службу доставки.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $update], param)
  }
}


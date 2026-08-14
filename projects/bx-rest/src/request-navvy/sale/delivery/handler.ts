import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $delete, $delivery, $handler, $list, $sale, $update } from '../../../consts/part-name-methods'

export class BXRestNavvySaleDeliveryHandler  {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует обработчик службы доставки.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $handler, $add], param)
  }
  /**
   * Удаляет обработчик службы доставки.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $handler, $delete], param)
  }
  /**
   * Возвращает список обработчиков служб доставки.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $handler, $list], param)
  }
  /**
   * Обновляет обработчик службы доставки.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $handler, $update], param)
  }
}


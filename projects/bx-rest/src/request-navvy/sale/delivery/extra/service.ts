import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $add, $delete, $delivery, $extra, $get, $sale, $service, $update } from '../../../../consts/part-name-methods'

export class BXRestNavvySaleDeliveryExtraService  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет дополнительную услугу службы доставки.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $extra, $service, $add], param)
  }
  /**
   * Удаляет дополнительную услугу службы доставки.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $extra, $service, $delete], param)
  }
  /**
   * Возвращает дополнительную услугу службы доставки.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $extra, $service, $get], param)
  }
  /**
   * Обновляет дополнительную услугу службы доставки.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $extra, $service, $update], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $config, $delivery, $get, $sale, $update } from '../../../consts/part-name-methods'

export class BXRestNavvySaleDeliveryConfig  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает настройки службы доставки.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $config, $get], param)
  }
  /**
   * Обновляет настройки службы доставки.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $config, $update], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $getFieldsExact, $list, $sale, $tradePlatform } from '../../consts/part-name-methods'

export class BXRestNavvySaleTradePlatform  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание полей источника заказов.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $tradePlatform, $getFieldsExact], param)
  }
  /**
   * Возвращает список источников заказов.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $tradePlatform, $list], param)
  }
}


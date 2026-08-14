import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $getFieldsExact, $list, $sale, $tradeBinding } from '../../consts/part-name-methods'

export class BXRestNavvySaleTradeBinding  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание полей привязки источника заказов.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $tradeBinding, $getFieldsExact], param)
  }
  /**
   * Возвращает список привязок источников заказов.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $tradeBinding, $list], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $cashbox, $delete, $list, $sale, $update } from '../../consts/part-name-methods'
import { BXRestNavvySaleCashboxCheck } from './cashbox/check'
import { BXRestNavvySaleCashboxHandler } from './cashbox/handler'

export class BXRestNavvySaleCashbox  {
  private readonly Navvy = new Navvy()

  /**
   * Чеки касс (`sale.cashbox.check.*`).
   */
  public readonly check = new BXRestNavvySaleCashboxCheck()
  /**
   * Обработчики касс (`sale.cashbox.handler.*`).
   */
  public readonly handler = new BXRestNavvySaleCashboxHandler()
  /**
   * Добавляет кассу.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $add], param)
  }
  /**
   * Удаляет кассу.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $delete], param)
  }
  /**
   * Возвращает список касс.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $list], param)
  }
  /**
   * Обновляет кассу.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $update], param)
  }
}


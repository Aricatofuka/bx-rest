import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $list, $paysystem, $sale, $update } from '../../consts/part-name-methods'
import { BXRestNavvySalePaySystemHandler } from './paysystem/handler'
import { BXRestNavvySalePaySystemPay } from './paysystem/pay'
import { BXRestNavvySalePaySystemSettings } from './paysystem/settings'

export class BXRestNavvySalePaySystem  {
  private readonly Navvy = new Navvy()

  /**
   * Обработчики платёжных систем (`sale.paysystem.handler.*`).
   */
  public readonly handler = new BXRestNavvySalePaySystemHandler()
  /**
   * Оплата через платёжную систему (`sale.paysystem.pay.*`).
   */
  public readonly pay = new BXRestNavvySalePaySystemPay()
  /**
   * Настройки платёжной системы (`sale.paysystem.settings.*`).
   */
  public readonly settings = new BXRestNavvySalePaySystemSettings()
  /**
   * Добавляет платёжную систему.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $add], param)
  }
  /**
   * Удаляет платёжную систему.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $delete], param)
  }
  /**
   * Возвращает список платёжных систем.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $list], param)
  }
  /**
   * Обновляет платёжную систему.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $update], param)
  }
}


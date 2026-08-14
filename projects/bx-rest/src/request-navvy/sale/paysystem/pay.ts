import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $pay, $payment, $paysystem, $sale } from '../../../consts/part-name-methods'

export class BXRestNavvySalePaySystemPay  {
  private readonly Navvy = new Navvy()

  /**
   * Выполняет оплату через платёжную систему.
   */
  public payment(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $pay, $payment], param)
  }
}


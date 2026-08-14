import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $apply, $cashbox, $check, $sale } from '../../../consts/part-name-methods'

export class BXRestNavvySaleCashboxCheck  {
  private readonly Navvy = new Navvy()

  /**
   * Формирует чек для кассы.
   */
  public apply(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $check, $apply], param)
  }
}


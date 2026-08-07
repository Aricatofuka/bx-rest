import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $cashbox, $delete, $list, $sale, $update } from '../../consts/part-name-methods'
import { BXRestNavvySaleCashboxCheck } from './cashbox/check'
import { BXRestNavvySaleCashboxHandler } from './cashbox/handler'

export class BXRestNavvySaleCashbox  {
  private readonly Navvy = new Navvy()

  public readonly check = new BXRestNavvySaleCashboxCheck()
  public readonly handler = new BXRestNavvySaleCashboxHandler()
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $add], param)
  }
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $delete], param)
  }
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $list], param)
  }
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $update], param)
  }
}


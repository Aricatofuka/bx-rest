import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $list, $paysystem, $sale, $update } from '../../consts/part-name-methods'
import { BXRestNavvySalePaySystemHandler } from './paysystem/handler'
import { BXRestNavvySalePaySystemPay } from './paysystem/pay'
import { BXRestNavvySalePaySystemSettings } from './paysystem/settings'

export class BXRestNavvySalePaySystem  {
  private readonly Navvy = new Navvy()

  public readonly handler = new BXRestNavvySalePaySystemHandler()
  public readonly pay = new BXRestNavvySalePaySystemPay()
  public readonly settings = new BXRestNavvySalePaySystemSettings()
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $add], param)
  }
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $delete], param)
  }
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $list], param)
  }
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $update], param)
  }
}


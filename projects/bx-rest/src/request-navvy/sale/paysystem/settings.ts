import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $get, $paysystem, $sale, $settings, $update } from '../../../consts/part-name-methods'
import { BXRestNavvySalePaySystemSettingsPayment } from './settings/payment'

export class BXRestNavvySalePaySystemSettings  {
  private readonly Navvy = new Navvy()

  public readonly payment = new BXRestNavvySalePaySystemSettingsPayment()
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $settings, $get], param)
  }
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $settings, $update], param)
  }
}


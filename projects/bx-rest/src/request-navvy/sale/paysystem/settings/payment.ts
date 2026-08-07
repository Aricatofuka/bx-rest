import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $get, $payment, $paysystem, $sale, $settings } from '../../../../consts/part-name-methods'

export class BXRestNavvySalePaySystemSettingsPayment  {
  private readonly Navvy = new Navvy()

  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $settings, $payment, $get], param)
  }
}


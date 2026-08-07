import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $b2e, $mysafe, $sign, $tail } from '../../../consts/part-name-methods'

export class BXRestNavvySignB2EMySafe  {
  private readonly Navvy = new Navvy()

  public tail(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sign, $b2e, $mysafe, $tail], param)
  }
}


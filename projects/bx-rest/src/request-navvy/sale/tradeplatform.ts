import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $getFieldsExact, $list, $sale, $tradePlatform } from '../../consts/part-name-methods'

export class BXRestNavvySaleTradePlatform  {
  private readonly Navvy = new Navvy()

  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $tradePlatform, $getFieldsExact], param)
  }
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $tradePlatform, $list], param)
  }
}


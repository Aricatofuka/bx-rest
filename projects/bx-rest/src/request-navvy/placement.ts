import { Navvy } from '../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../typification/rest/common'
import { $bind, $get, $list, $placement, $unbind } from '../consts/part-name-methods'

export class BXRestNavvyPlacement {
  private readonly Navvy = new Navvy()

  public bind(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $bind], param)
  }
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $get], param)
  }
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $list], param)
  }
  public unbind(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$placement, $unbind], param)
  }
}

import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $callback, $start, $voximplant } from '../../consts/part-name-methods'

export class BXRestNavvyVoxImplantCallback  {
  private readonly Navvy = new Navvy()

  start(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $callback, $start], param)
  }
}


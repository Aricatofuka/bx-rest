import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $ai, $engine, $list, $register, $unregister } from '../../consts/part-name-methods'

export class BXRestNavvyAiEngine {
  private readonly Navvy = new Navvy()

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$ai, $engine, $list], param)
  }

  register(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$ai, $engine, $register], param
    )
  }

  unregister(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$ai, $engine, $unregister], param
    )
  }
}


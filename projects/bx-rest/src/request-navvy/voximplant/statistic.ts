import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $get, $statistic, $voximplant } from '../../consts/part-name-methods'

export class BXRestNavvyVoxImplantStatistic  {
  private readonly Navvy = new Navvy()

  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$voximplant, $statistic, $get], param)
  }
}


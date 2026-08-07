import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $create, $crm, $imopenlines, $lead } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesCrmLead  {
  private readonly Navvy = new Navvy()

  create(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $lead, $create], param)
  }
}


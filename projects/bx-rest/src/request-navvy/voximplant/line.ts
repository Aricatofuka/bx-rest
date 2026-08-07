import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $get, $line, $voximplant } from '../../consts/part-name-methods'
import { BXRestNavvyVoxImplantLineOutgoing } from './line/outgoing'

export class BXRestNavvyVoxImplantLine  {
  private readonly Navvy = new Navvy()

  public readonly outgoing = new BXRestNavvyVoxImplantLineOutgoing()

  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$voximplant, $line, $get], param)
  }
}


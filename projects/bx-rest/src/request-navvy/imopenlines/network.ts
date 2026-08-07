import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $imopenlines, $join, $network } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesNetworkMessage } from './network/message'

export class BXRestNavvyImOpenLinesNetwork  {
  private readonly Navvy = new Navvy()

  public readonly message = new BXRestNavvyImOpenLinesNetworkMessage()

  join(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $network, $join], param)
  }
}


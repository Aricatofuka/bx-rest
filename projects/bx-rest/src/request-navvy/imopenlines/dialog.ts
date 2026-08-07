import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $dialog, $get, $imopenlines } from '../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesDialog  {
  private readonly Navvy = new Navvy()

  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $dialog, $get], param)
  }
}


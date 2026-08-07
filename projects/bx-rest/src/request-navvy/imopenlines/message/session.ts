import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $imopenlines, $message, $session, $start } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesMessageSession  {
  private readonly Navvy = new Navvy()

  start(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $message, $session, $start], param)
  }
}


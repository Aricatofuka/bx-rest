import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $head, $imopenlines, $session, $vote } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesSessionHead  {
  private readonly Navvy = new Navvy()

  vote(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $head, $vote], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $another, $finish, $imopenlines, $operator } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesOperatorAnother  {
  private readonly Navvy = new Navvy()

  finish(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $another, $finish], param)
  }
}


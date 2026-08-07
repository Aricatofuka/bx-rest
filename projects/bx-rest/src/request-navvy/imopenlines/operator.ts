import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $answer, $finish, $imopenlines, $operator, $skip, $spam, $transfer } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesOperatorAnother } from './operator/another'

export class BXRestNavvyImOpenLinesOperator  {
  private readonly Navvy = new Navvy()

  public readonly another = new BXRestNavvyImOpenLinesOperatorAnother()

  answer(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $answer], param)
  }

  finish(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $finish], param)
  }

  skip(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $skip], param)
  }

  spam(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $spam], param)
  }

  transfer(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $operator, $transfer], param)
  }
}


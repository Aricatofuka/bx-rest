import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $bot, $finish, $imopenlines, $operator, $session, $transfer } from '../../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesBotSessionMessage } from './session/message'

export class BXRestNavvyImOpenLinesBotSession  {
  private readonly Navvy = new Navvy()

  public readonly message = new BXRestNavvyImOpenLinesBotSessionMessage()

  finish(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $bot, $session, $finish], param)
  }

  operator(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $bot, $session, $operator], param)
  }

  transfer(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $bot, $session, $transfer], param)
  }
}


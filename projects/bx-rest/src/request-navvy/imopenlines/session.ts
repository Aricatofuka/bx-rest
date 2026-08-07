import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $imopenlines, $intercept, $join, $open, $session, $start } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesSessionHead } from './session/head'
import { BXRestNavvyImOpenLinesSessionHistory } from './session/history'
import { BXRestNavvyImOpenLinesSessionMode } from './session/mode'

export class BXRestNavvyImOpenLinesSession  {
  private readonly Navvy = new Navvy()

  public readonly head = new BXRestNavvyImOpenLinesSessionHead()
  public readonly history = new BXRestNavvyImOpenLinesSessionHistory()
  public readonly mode = new BXRestNavvyImOpenLinesSessionMode()

  intercept(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $intercept], param)
  }

  join(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $join], param)
  }

  open(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $open], param)
  }

  start(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $start], param)
  }
}


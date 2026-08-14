import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $get, $history, $imopenlines, $session } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesSessionHistory  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает историю сообщений и данные сессии.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $history, $get], param)
  }
}


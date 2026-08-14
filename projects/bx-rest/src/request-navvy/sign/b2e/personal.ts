import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $b2e, $personal, $sign, $tail } from '../../../consts/part-name-methods'

export class BXRestNavvySignB2EPersonal  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список подписанных документов пользователя.
   */
  public tail(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sign, $b2e, $personal, $tail], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Revision, $get, $imbot, $v2 } from '../../../consts/part-name-methods'

export class BXRestNavvyImBotV2Revision  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает номера ревизий API и клиентских протоколов.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Revision, $get], param)
  }
}


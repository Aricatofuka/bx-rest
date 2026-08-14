import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $Event, $get, $imbot, $v2 } from '../../../consts/part-name-methods'

export class BXRestNavvyImBotV2Event  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает события бота в режиме polling.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $Event, $get], param)
  }
}


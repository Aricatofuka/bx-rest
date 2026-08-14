import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $get, $url, $voximplant } from '../../consts/part-name-methods'

export class BXRestNavvyVoxImplantUrl  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает ссылки для навигации по страницам телефонии.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $url, $get], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $agreement, $list, $text, $userconsent } from '../../consts/part-name-methods'

export class BXRestNavvyUserConsentAgreement {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список соглашений.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$userconsent, $agreement, $list], param)
  }

  /**
   * Возвращает текст соглашения.
   */
  text(param: iBXRestGenericParams) {
    return this.Navvy.simple<string, string, iBXRestGenericParams>(
      [$userconsent, $agreement, $text], param
    )
  }
}


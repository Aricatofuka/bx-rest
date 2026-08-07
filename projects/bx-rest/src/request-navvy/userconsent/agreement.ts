import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $agreement, $list, $text, $userconsent } from '../../consts/part-name-methods'

export class BXRestNavvyUserConsentAgreement {
  private readonly Navvy = new Navvy()

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$userconsent, $agreement, $list], param)
  }

  text(param: iBXRestGenericParams) {
    return this.Navvy.simple<string, string, iBXRestGenericParams>(
      [$userconsent, $agreement, $text], param
    )
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $consent, $userconsent } from '../../consts/part-name-methods'

export class BXRestNavvyUserConsentConsent {
  private readonly Navvy = new Navvy()

  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$userconsent, $consent, $add], param
    )
  }
}


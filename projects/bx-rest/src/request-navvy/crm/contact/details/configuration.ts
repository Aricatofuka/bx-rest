import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $configuration, $contact, $crm, $details, $forceCommonScopeForAll, $get, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmContactDetailsConfiguration {
  private readonly Navvy = new Navvy()

  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $contact, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  get(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $contact, $details, $configuration, $get],
      param
    )
  }

  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $contact, $details, $configuration, $reset],
      param
    )
  }

  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $contact, $details, $configuration, $set],
      param
    )
  }
}

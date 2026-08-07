import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $company, $configuration, $crm, $details, $forceCommonScopeForAll, $get, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmCompanyDetailsConfiguration {
  private readonly Navvy = new Navvy()

  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  get(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $get],
      param
    )
  }

  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $reset],
      param
    )
  }

  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $set],
      param
    )
  }
}

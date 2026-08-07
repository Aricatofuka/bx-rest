import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $configuration, $crm, $details, $forceCommonScopeForAll, $get, $item, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemDetailsConfiguration {
  private readonly Navvy = new Navvy()

  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  get(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $get],
      param
    )
  }

  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $reset],
      param
    )
  }

  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $set],
      param
    )
  }
}

import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $crm, $currency, $delete, $fields, $get, $localizations, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmCurrencyLocalizations {
  private readonly Navvy = new Navvy()

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $currency, $localizations, $delete], param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $currency, $localizations, $fields])
  }

  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $currency, $localizations, $get], param
    )
  }

  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $currency, $localizations, $set], param
    )
  }
}

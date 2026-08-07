import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $company, $contact, $crm, $delete, $get, $items, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmCompanyContactItems {
  private readonly Navvy = new Navvy()

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $contact, $items, $delete],
      param
    )
  }

  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>(
      [$crm, $company, $contact, $items, $get],
      param
    )
  }

  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $contact, $items, $set],
      param
    )
  }
}

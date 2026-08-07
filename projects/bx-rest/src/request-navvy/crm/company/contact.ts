import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $company, $contact, $crm, $delete, $fields } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmCompanyContactItems } from './contact/items'

export class BXRestNavvyCrmCompanyContact {
  private readonly Navvy = new Navvy()
  public readonly items = new BXRestNavvyCrmCompanyContactItems()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $contact, $add],
      param
    )
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $contact, $delete],
      param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $company, $contact, $fields])
  }
}

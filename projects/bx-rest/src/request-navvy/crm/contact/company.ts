import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $company, $contact, $crm, $delete, $fields } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmContactCompanyItems } from './company/items'

export class BXRestNavvyCrmContactCompany {
  private readonly Navvy = new Navvy()
  public readonly items = new BXRestNavvyCrmContactCompanyItems()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $contact, $company, $add],
      param
    )
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $contact, $company, $delete],
      param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $contact, $company, $fields])
  }
}

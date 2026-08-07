import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $contact, $crm, $delete, $fields, $lead } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmLeadContactItems } from './contact/items'

export class BXRestNavvyCrmLeadContact {
  private readonly Navvy = new Navvy()
  public readonly items = new BXRestNavvyCrmLeadContactItems()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $contact, $add],
      param
    )
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $contact, $delete],
      param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $lead, $contact, $fields])
  }
}

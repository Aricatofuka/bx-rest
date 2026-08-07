import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $contact, $crm, $deal, $delete, $fields } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmDealContactItems } from './contact/items'

export class BXRestNavvyCrmDealContact {
  private readonly Navvy = new Navvy()
  public readonly items = new BXRestNavvyCrmDealContactItems()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $contact, $add],
      param
    )
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $contact, $delete],
      param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $deal, $contact, $fields])
  }
}

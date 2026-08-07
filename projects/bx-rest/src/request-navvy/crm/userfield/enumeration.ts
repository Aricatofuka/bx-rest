import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject } from '../../../typification/rest/crm'
import { $crm, $enumeration, $fields, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmUserFieldEnumeration {
  private readonly Navvy = new Navvy()

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $userfield, $enumeration, $fields])
  }
}


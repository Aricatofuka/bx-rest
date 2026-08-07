import { Navvy } from '../../services/navvy'
import { iBXRestCrmObject } from '../../typification/rest/crm'
import { $crm, $fields, $types, $userfield } from '../../consts/part-name-methods'
import { BXRestNavvyCrmUserFieldEnumeration } from './userfield/enumeration'
import { BXRestNavvyCrmUserFieldSettings } from './userfield/settings'

export class BXRestNavvyCrmUserField {
  private readonly Navvy = new Navvy()
  public readonly enumeration = new BXRestNavvyCrmUserFieldEnumeration()
  public readonly settings = new BXRestNavvyCrmUserFieldSettings()

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $userfield, $fields])
  }

  types() {
    return this.Navvy.simple<iBXRestCrmObject[]>([$crm, $userfield, $types])
  }
}



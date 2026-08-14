import { Navvy } from '../../services/navvy'
import { iBXRestCrmObject } from '../../typification/rest/crm'
import { $crm, $fields, $types, $userfield } from '../../consts/part-name-methods'
import { BXRestNavvyCrmUserFieldEnumeration } from './userfield/enumeration'
import { BXRestNavvyCrmUserFieldSettings } from './userfield/settings'

export class BXRestNavvyCrmUserField {
  private readonly Navvy = new Navvy()
  /**
   * Поля пользовательского поля типа enumeration (`crm.userfield.enumeration.*`).
   */
  public readonly enumeration = new BXRestNavvyCrmUserFieldEnumeration()
  /**
   * Настройки пользовательских полей (`crm.userfield.settings.*`).
   */
  public readonly settings = new BXRestNavvyCrmUserFieldSettings()

  /**
   * Возвращает описание характеристик пользовательских полей.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $userfield, $fields])
  }

  /**
   * Возвращает список типов пользовательских полей.
   */
  types() {
    return this.Navvy.simple<iBXRestCrmObject[]>([$crm, $userfield, $types])
  }
}



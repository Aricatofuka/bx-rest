import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $contact, $crm, $delete, $fields, $lead } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmLeadContactItems } from './contact/items'

export class BXRestNavvyCrmLeadContact {
  private readonly Navvy = new Navvy()
  /**
   * Набор контактов лида (`crm.lead.contact.items.*`).
   */
  public readonly items = new BXRestNavvyCrmLeadContactItems()

  /**
   * Добавляет привязку контакта к указанному лиду.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $contact, $add],
      param
    )
  }

  /**
   * Удаляет привязку контакта к указанному лиду.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $contact, $delete],
      param
    )
  }

  /**
   * Возвращает описание полей для связи лид-контакт.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $lead, $contact, $fields])
  }
}

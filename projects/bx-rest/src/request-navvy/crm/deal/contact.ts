import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $contact, $crm, $deal, $delete, $fields } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmDealContactItems } from './contact/items'

export class BXRestNavvyCrmDealContact {
  private readonly Navvy = new Navvy()
  /**
   * Набор контактов сделки (`crm.deal.contact.items.*`).
   */
  public readonly items = new BXRestNavvyCrmDealContactItems()

  /**
   * Связывает контакт со сделкой.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $contact, $add],
      param
    )
  }

  /**
   * Убирает контакт из сделки.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $contact, $delete],
      param
    )
  }

  /**
   * Возвращает описание полей связи сделки с контактом.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $deal, $contact, $fields])
  }
}

import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $company, $contact, $crm, $delete, $fields } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmContactCompanyItems } from './company/items'

export class BXRestNavvyCrmContactCompany {
  private readonly Navvy = new Navvy()
  /**
   * Набор компаний контакта (`crm.contact.company.items.*`).
   */
  public readonly items = new BXRestNavvyCrmContactCompanyItems()

  /**
   * Связывает компанию с контактом.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $contact, $company, $add],
      param
    )
  }

  /**
   * Удаляет связь компании с контактом.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $contact, $company, $delete],
      param
    )
  }

  /**
   * Возвращает описание полей для связи контакт-компания.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $contact, $company, $fields])
  }
}

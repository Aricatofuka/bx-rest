import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $company, $contact, $crm, $delete, $fields } from '../../../consts/part-name-methods'

import { BXRestNavvyCrmCompanyContactItems } from './contact/items'

export class BXRestNavvyCrmCompanyContact {
  private readonly Navvy = new Navvy()
  /**
   * Набор контактов компании (`crm.company.contact.items.*`).
   */
  public readonly items = new BXRestNavvyCrmCompanyContactItems()

  /**
   * Добавляет контакт к указанной компании.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $contact, $add],
      param
    )
  }

  /**
   * Удаляет контакт из указанной компании.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $contact, $delete],
      param
    )
  }

  /**
   * Возвращает описание полей связи компания-контакт.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $company, $contact, $fields])
  }
}

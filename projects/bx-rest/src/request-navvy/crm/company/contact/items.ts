import { Navvy } from '../../../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestParamCrmCompanyContactItems
} from '../../../../typification/rest/crm'
import { $company, $contact, $crm, $delete, $get, $items, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmCompanyContactItems {
  private readonly Navvy = new Navvy()

  /**
   * Очищает набор контактов компании
   * @see https://apidocs.bitrix24.ru/api-reference/crm/companies/contacts/crm-company-contact-items-delete.html
   */
  delete(param: iBXRestParamCrmCompanyContactItems) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCompanyContactItems>(
      [$crm, $company, $contact, $items, $delete],
      param
    )
  }

  /**
   * Возвращает набор контактов, связанных с компанией
   * @see https://apidocs.bitrix24.ru/api-reference/crm/companies/contacts/crm-company-contact-items-get.html
   */
  get(param: iBXRestParamCrmCompanyContactItems) {
    return this.Navvy.simple<
      iBXRestCrmObject[],
      iBXRestCrmObject[],
      iBXRestParamCrmCompanyContactItems
    >(
      [$crm, $company, $contact, $items, $get],
      param
    )
  }

  /**
   * Устанавливает набор контактов для компании
   * @see https://apidocs.bitrix24.ru/api-reference/crm/companies/contacts/crm-company-contact-items-set.html
   */
  set(param: iBXRestParamCrmCompanyContactItems) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCompanyContactItems>(
      [$crm, $company, $contact, $items, $set],
      param
    )
  }
}

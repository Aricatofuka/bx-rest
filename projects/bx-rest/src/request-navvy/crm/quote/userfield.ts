import { Navvy } from '../../../services/navvy'
import { $add, $crm, $delete, $get, $list, $quote, $update, $userfield } from '../../../consts/part-name-methods'
import {
  iBXRestCrmQuoteUserField,
  iBXRestCrmQuoteUserFieldHttp,
  iBXRestParamCrmQuoteUserFieldAdd,
  iBXRestParamCrmQuoteUserFieldDelete,
  iBXRestParamCrmQuoteUserFieldGet,
  iBXRestParamCrmQuoteUserFieldList,
  iBXRestParamCrmQuoteUserFieldUpdate
} from '../../../typification/rest/crm'
import { BXRestMapCrmQuoteUserField } from '../../../map/crm'

/** Методы пользовательских полей коммерческих предложений. */
export class BXRestNavvyCrmQuoteUserField {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $quote, $userfield, $add],
    update: [$crm, $quote, $userfield, $update],
    get: [$crm, $quote, $userfield, $get],
    list: [$crm, $quote, $userfield, $list],
    delete: [$crm, $quote, $userfield, $delete]
  }

  /**
   * Создает пользовательское поле для предложений.
   * Метод доступен администратору CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/user-field/crm-quote-user-field-add.html
   */
  add(param: iBXRestParamCrmQuoteUserFieldAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmQuoteUserFieldAdd>(this.url.add, param)
  }

  /**
   * Обновляет существующее пользовательское поле предложений.
   * Метод доступен администратору CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/user-field/crm-quote-user-field-update.html
   */
  update(param: iBXRestParamCrmQuoteUserFieldUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmQuoteUserFieldUpdate>(this.url.update, param)
  }

  /**
   * Возвращает пользовательское поле предложения по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/user-field/crm-quote-user-field-get.html
   */
  get(param: iBXRestParamCrmQuoteUserFieldGet) {
    return this.Navvy.simple<iBXRestCrmQuoteUserFieldHttp, iBXRestCrmQuoteUserField, iBXRestParamCrmQuoteUserFieldGet>(
      this.url.get,
      param,
      BXRestMapCrmQuoteUserField.get
    )
  }

  /**
   * Возвращает список пользовательских полей предложений по фильтру.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/user-field/crm-quote-user-field-list.html
   */
  list(param: iBXRestParamCrmQuoteUserFieldList = {}) {
    return this.Navvy.simple<iBXRestCrmQuoteUserFieldHttp[], iBXRestCrmQuoteUserField[], iBXRestParamCrmQuoteUserFieldList>(
      this.url.list,
      param,
      BXRestMapCrmQuoteUserField.list
    )
  }

  /**
   * Удаляет пользовательское поле предложений.
   * Метод доступен администратору CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/user-field/crm-quote-user-field-delete.html
   */
  delete(param: iBXRestParamCrmQuoteUserFieldDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmQuoteUserFieldDelete>(this.url.delete, param)
  }
}

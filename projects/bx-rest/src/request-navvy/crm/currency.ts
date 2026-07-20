import { $add, $crm, $currency, $delete, $get, $list, $update } from '../../consts/part-name-methods'
import { BXRestMapCrmCurrency } from '../../map/crm'
import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmCurrency,
  iBXRestCrmCurrencyFields,
  iBXRestCrmCurrencyHttp,
  iBXRestParamCrmCurrencyAdd,
  iBXRestParamCrmCurrencyDelete,
  iBXRestParamCrmCurrencyGet,
  iBXRestParamCrmCurrencyList,
  iBXRestParamCrmCurrencyUpdate
} from '../../typification/rest/crm'
import { BXRestNavvyCrmCurrencyBase } from './currency/base'

export * from './currency/base'

/** Навигатор REST-методов валют CRM (`crm.currency.*`). */
export class BXRestNavvyCrmCurrency {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $currency, $add],
    update: [$crm, $currency, $update],
    get: [$crm, $currency, $get],
    list: [$crm, $currency, $list],
    delete: [$crm, $currency, $delete],
    fields: [$crm, $currency, 'fields']
  }

  /** Базовая валюта (`crm.currency.base.*`). */
  public readonly base = new BXRestNavvyCrmCurrencyBase()

  /**
   * Создает новую валюту.
   *
   * @param param Поля новой валюты, включая код ISO 4217, номинал и курс.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-add.html
   */
  add(param: iBXRestParamCrmCurrencyAdd) {
    return this.Navvy.simple<string, string, iBXRestParamCrmCurrencyAdd>(this.url.add, param)
  }

  /**
   * Обновляет существующую валюту.
   *
   * @param param Идентификатор валюты и изменяемые поля.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-update.html
   */
  update(param: iBXRestParamCrmCurrencyUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCurrencyUpdate>(this.url.update, param)
  }

  /**
   * Возвращает валюту по символьному идентификатору.
   *
   * @param param Символьный идентификатор валюты по ISO 4217.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-get.html
   */
  get(param: iBXRestParamCrmCurrencyGet) {
    return this.Navvy.simple<
      iBXRestCrmCurrencyHttp,
      iBXRestCrmCurrency,
      iBXRestParamCrmCurrencyGet
    >(this.url.get, param, BXRestMapCrmCurrency.get)
  }

  /**
   * Возвращает список валют с локализацией для текущего языка портала.
   *
   * @param param Необязательный порядок сортировки.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-list.html
   */
  list(param: iBXRestParamCrmCurrencyList = {}) {
    return this.Navvy.simple<
      iBXRestCrmCurrencyHttp[],
      iBXRestCrmCurrency[],
      iBXRestParamCrmCurrencyList
    >(this.url.list, param, BXRestMapCrmCurrency.list)
  }

  /**
   * Удаляет валюту.
   *
   * @param param Символьный идентификатор удаляемой валюты.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-delete.html
   */
  delete(param: iBXRestParamCrmCurrencyDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCurrencyDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей валюты.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmCurrencyFields>(this.url.fields)
  }
}

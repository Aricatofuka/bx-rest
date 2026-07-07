import { Navvy } from '../../../services/navvy'
import { $add, $crm, $delete, $get, $list, $quote, $update } from '../../../consts/part-name-methods'
import {
  iBXRestParamCrmQuoteAdd,
  iBXRestParamCrmQuoteDelete,
  iBXRestParamCrmQuoteGet,
  iBXRestParamCrmQuoteList,
  iBXRestParamCrmQuoteUpdate
} from '../../../typification/rest/crm'
import { BXRestMapCrmQuote } from '../../../map/crm'
import { BXRestNavvyCrmQuoteProductRows } from './productrows'
import { BXRestNavvyCrmQuoteUserField } from './userfield'

export * from './productrows'
export * from './userfield'

/** Навигатор REST-методов коммерческих предложений Bitrix24. */
export class BXRestNavvyCrmQuote {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $quote, $add],
    update: [$crm, $quote, $update],
    get: [$crm, $quote, $get],
    list: [$crm, $quote, $list],
    delete: [$crm, $quote, $delete],
    fields: [$crm, $quote, 'fields']
  }

  /** Товарные позиции предложения (`crm.quote.productrows.*`). */
  public readonly productrows = new BXRestNavvyCrmQuoteProductRows()

  /** Пользовательские поля предложений (`crm.quote.userfield.*`). */
  public readonly userfield = new BXRestNavvyCrmQuoteUserField()

  /**
   * Создает коммерческое предложение.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.add`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-add.html
   */
  add(param: iBXRestParamCrmQuoteAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmQuoteAdd>(this.url.add, param)
  }

  /**
   * Изменяет существующее коммерческое предложение.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.update`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-update.html
   */
  update(param: iBXRestParamCrmQuoteUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmQuoteUpdate>(this.url.update, param)
  }

  /**
   * Возвращает коммерческое предложение по идентификатору.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.get`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-get.html
   */
  get(param: iBXRestParamCrmQuoteGet) {
    return this.Navvy.simple(this.url.get, param, BXRestMapCrmQuote.get)
  }

  /**
   * Возвращает список коммерческих предложений по фильтру.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.list`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-list.html
   */
  list(param: iBXRestParamCrmQuoteList = {}) {
    return this.Navvy.pagNav(this.url.list, param, BXRestMapCrmQuote.list)
  }

  /**
   * Удаляет коммерческое предложение.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.delete`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-delete.html
   */
  delete(param: iBXRestParamCrmQuoteDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmQuoteDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей коммерческого предложения.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.fields`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-fields.html
   */
  fields() {
    return this.Navvy.simple<Record<string, any>, Record<string, any>, undefined>(this.url.fields)
  }
}

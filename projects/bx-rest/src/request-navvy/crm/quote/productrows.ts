import { Navvy } from '../../../services/navvy'
import { $crm, $get, $productrows, $quote, $set } from '../../../consts/part-name-methods'
import {
  iBXRestCrmQuoteProductRow,
  iBXRestCrmQuoteProductRowHttp,
  iBXRestParamCrmQuoteProductRowsGet,
  iBXRestParamCrmQuoteProductRowsSet
} from '../../../typification/rest/crm'
import { BXRestMapCrmQuoteProductRow } from '../../../map/crm'

/** Методы товарных позиций коммерческого предложения. */
export class BXRestNavvyCrmQuoteProductRows {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$crm, $quote, $productrows, $get],
    set: [$crm, $quote, $productrows, $set]
  }

  /**
   * Возвращает товарные позиции коммерческого предложения.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.productrow.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-product-rows-get.html
   */
  get(param: iBXRestParamCrmQuoteProductRowsGet) {
    return this.Navvy.simple<iBXRestCrmQuoteProductRowHttp[], iBXRestCrmQuoteProductRow[], iBXRestParamCrmQuoteProductRowsGet>(
      this.url.get,
      param,
      BXRestMapCrmQuoteProductRow.list
    )
  }

  /**
   * Полностью заменяет товарные позиции коммерческого предложения.
   * Передайте пустой массив `rows`, чтобы удалить все позиции.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.item.productrow.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/quote/crm-quote-product-rows-set.html
   */
  set(param: iBXRestParamCrmQuoteProductRowsSet) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmQuoteProductRowsSet>(this.url.set, param)
  }
}

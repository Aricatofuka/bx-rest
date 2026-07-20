import { $crm, $currency, $get, $set } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamCrmCurrencyBaseSet } from '../../../typification/rest/crm'

/** Методы управления базовой валютой (`crm.currency.base.*`). */
export class BXRestNavvyCrmCurrencyBase {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$crm, $currency, 'base', $get],
    set: [$crm, $currency, 'base', $set]
  }

  /**
   * Возвращает символьный идентификатор базовой валюты.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-base-get.html
   */
  get() {
    return this.Navvy.simple<string>(this.url.get)
  }

  /**
   * Устанавливает указанную валюту в качестве базовой.
   * После смены базовой валюты курсы остальных валют необходимо обновить вручную.
   *
   * @param param Символьный идентификатор новой базовой валюты.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/currency/crm-currency-base-set.html
   */
  set(param: iBXRestParamCrmCurrencyBaseSet) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCurrencyBaseSet>(this.url.set, param)
  }
}

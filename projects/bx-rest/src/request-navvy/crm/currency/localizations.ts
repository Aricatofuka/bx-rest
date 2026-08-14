import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $crm, $currency, $delete, $fields, $get, $localizations, $set } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmCurrencyLocalizations {
  private readonly Navvy = new Navvy()

  /**
   * Удаляет локализации валюты для указанных языков.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $currency, $localizations, $delete], param
    )
  }

  /**
   * Возвращает поля локализации валюты, зависящие от языка.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $currency, $localizations, $fields])
  }

  /**
   * Возвращает существующие локализации валюты.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $currency, $localizations, $get], param
    )
  }

  /**
   * Обновляет локализации валюты или добавляет их, если локализации для языка ещё нет.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $currency, $localizations, $set], param
    )
  }
}

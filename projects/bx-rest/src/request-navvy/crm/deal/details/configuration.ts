import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $configuration, $crm, $deal, $details, $forceCommonScopeForAll, $get, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmDealDetailsConfiguration {
  private readonly Navvy = new Navvy()

  /**
   * Принудительно устанавливает общую карточку сделки для всех пользователей.
   */
  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  /**
   * Возвращает настройки карточки сделки.
   */
  get(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $deal, $details, $configuration, $get],
      param
    )
  }

  /**
   * Сбрасывает настройки карточки сделки.
   */
  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $details, $configuration, $reset],
      param
    )
  }

  /**
   * Устанавливает настройки карточки сделки.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $details, $configuration, $set],
      param
    )
  }
}

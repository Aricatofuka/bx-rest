import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $configuration, $crm, $details, $forceCommonScopeForAll, $get, $lead, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmLeadDetailsConfiguration {
  private readonly Navvy = new Navvy()

  /**
   * Принудительно устанавливает общую карточку лидов для всех пользователей.
   */
  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  /**
   * Возвращает параметры настройки карточки лидов.
   */
  get(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $lead, $details, $configuration, $get],
      param
    )
  }

  /**
   * Сбрасывает настройки карточки лидов.
   */
  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $details, $configuration, $reset],
      param
    )
  }

  /**
   * Устанавливает настройки карточки лидов.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $details, $configuration, $set],
      param
    )
  }
}

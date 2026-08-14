import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $configuration, $crm, $details, $forceCommonScopeForAll, $get, $item, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemDetailsConfiguration {
  private readonly Navvy = new Navvy()

  /**
   * Принудительно устанавливает общую карточку элемента для всех пользователей.
   */
  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  /**
   * Возвращает настройки карточки элемента CRM.
   */
  get(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $get],
      param
    )
  }

  /**
   * Сбрасывает настройки карточки элемента CRM.
   */
  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $reset],
      param
    )
  }

  /**
   * Устанавливает настройки карточки элемента CRM.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $set],
      param
    )
  }
}

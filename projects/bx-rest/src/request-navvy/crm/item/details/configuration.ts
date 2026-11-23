import { Navvy } from '../../../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestCrmParams,
  iBXRestParamCrmItemDetailsConfigurationGet
} from '../../../../typification/rest/crm'
import { $configuration, $crm, $details, $forceCommonScopeForAll, $get, $item, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmItemDetailsConfiguration {
  private readonly Navvy = new Navvy()

  /**
   * Принудительно устанавливает общую карточку элемента для всех пользователей
   */
  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  /**
   * Возвращает настройки карточки элемента CRM
   * @see https://apidocs.bitrix24.ru/api-reference/crm/universal/item-details-configuration/crm-item-details-configuration-get.html
   */
  get(param: iBXRestParamCrmItemDetailsConfigurationGet) {
    return this.Navvy.simple<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmItemDetailsConfigurationGet
    >(
      [$crm, $item, $details, $configuration, $get],
      param
    )
  }

  /**
   * Сбрасывает настройки карточки элемента CRM
   */
  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $reset],
      param
    )
  }

  /**
   * Устанавливает настройки карточки элемента CRM
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $item, $details, $configuration, $set],
      param
    )
  }
}

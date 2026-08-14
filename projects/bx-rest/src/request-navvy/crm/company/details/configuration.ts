import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $company, $configuration, $crm, $details, $forceCommonScopeForAll, $get, $reset, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmCompanyDetailsConfiguration {
  private readonly Navvy = new Navvy()

  /**
   * Принудительно устанавливает общую карточку компаний для всех пользователей.
   */
  forceCommonScopeForAll(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $forceCommonScopeForAll],
      param
    )
  }

  /**
   * Возвращает настройки карточки компаний.
   */
  get(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $get],
      param
    )
  }

  /**
   * Сбрасывает настройки карточки компаний.
   */
  reset(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $reset],
      param
    )
  }

  /**
   * Устанавливает настройки карточки компаний.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $company, $details, $configuration, $set],
      param
    )
  }
}

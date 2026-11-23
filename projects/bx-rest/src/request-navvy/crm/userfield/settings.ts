import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestParamCrmUserFieldSettingsFields
} from '../../../typification/rest/crm'
import { $crm, $fields, $settings, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmUserFieldSettings {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание полей настроек для указанного типа пользовательского поля
   * @see https://apidocs.bitrix24.ru/api-reference/crm/universal/user-defined-fields/crm-userfield-settings-fields.html
   */
  fields(param: iBXRestParamCrmUserFieldSettingsFields) {
    return this.Navvy.simple<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmUserFieldSettingsFields
    >([$crm, $userfield, $settings, $fields], param)
  }
}

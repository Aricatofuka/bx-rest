import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject } from '../../../typification/rest/crm'
import { $crm, $fields, $settings, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmUserFieldSettings {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание полей настроек для указанного типа пользовательского поля.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $userfield, $settings, $fields])
  }
}


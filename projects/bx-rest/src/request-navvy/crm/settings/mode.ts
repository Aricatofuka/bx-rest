import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject } from '../../../typification/rest/crm'
import { $crm, $get, $mode, $settings } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmSettingsMode {
  private readonly Navvy = new Navvy()

  /**
   * Определяет текущий режим работы CRM (простой или классический).
   */
  get() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $settings, $mode, $get])
  }
}


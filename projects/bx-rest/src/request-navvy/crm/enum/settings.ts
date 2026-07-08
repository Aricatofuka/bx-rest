import { $crm, $settings } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestCrmEnumItem } from '../../../typification/rest/crm'

/** Перечисления настроек CRM (`crm.enum.settings.*`). */
export class BXRestNavvyCrmEnumSettings {
  private readonly Navvy = new Navvy()
  private readonly url = {
    mode: [$crm, 'enum', $settings, 'mode']
  }

  /**
   * Возвращает список режимов работы CRM для расшифровки значения,
   * полученного методом `crm.settings.mode.get`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/crm-enum-settings-mode.html
   */
  mode() {
    return this.Navvy.simple<iBXRestCrmEnumItem[]>(this.url.mode)
  }
}

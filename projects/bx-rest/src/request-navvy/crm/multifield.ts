import { $crm, $multifield } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestCrmMultifieldFields } from '../../typification/rest/crm'

/** Методы описания множественных полей CRM (`crm.multifield.*`). */
export class BXRestNavvyCrmMultifield {
  private readonly Navvy = new Navvy()
  private readonly url = {
    fields: [$crm, $multifield, 'fields']
  }

  /**
   * Возвращает описание множественных полей для телефонов, email-адресов
   * и другой контактной информации лидов, контактов и компаний.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/multifield/crm-multifield-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmMultifieldFields>(this.url.fields)
  }
}

import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $contact, $crm, $delete, $get, $items, $lead, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmLeadContactItems {
  private readonly Navvy = new Navvy()

  /**
   * Удаляет список контактов у лида.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $contact, $items, $delete],
      param
    )
  }

  /**
   * Возвращает список связанных с лидом контактов.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>(
      [$crm, $lead, $contact, $items, $get],
      param
    )
  }

  /**
   * Прикрепляет список контактов к указанному лиду.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $lead, $contact, $items, $set],
      param
    )
  }
}

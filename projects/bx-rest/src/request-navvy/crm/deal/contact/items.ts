import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $contact, $crm, $deal, $delete, $get, $items, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmDealContactItems {
  private readonly Navvy = new Navvy()

  /**
   * Убирает из сделки все контакты.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $contact, $items, $delete],
      param
    )
  }

  /**
   * Возвращает набор контактов, связанных со сделкой.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>(
      [$crm, $deal, $contact, $items, $get],
      param
    )
  }

  /**
   * Заменяет набор контактов сделки на переданный.
   */
  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $deal, $contact, $items, $set],
      param
    )
  }
}

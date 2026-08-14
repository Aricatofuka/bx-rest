import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $contact, $crm, $delete, $get, $list, $update, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmContactUserField {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт пользовательское поле для контактов.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $contact, $userfield, $add], param)
  }

  /**
   * Удаляет пользовательское поле контактов.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $contact, $userfield, $delete], param)
  }

  /**
   * Возвращает пользовательское поле контактов по идентификатору.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $contact, $userfield, $get], param)
  }

  /**
   * Возвращает список пользовательских полей контактов.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $contact, $userfield, $list], param)
  }

  /**
   * Изменяет существующее пользовательское поле контактов.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $contact, $userfield, $update], param)
  }
}

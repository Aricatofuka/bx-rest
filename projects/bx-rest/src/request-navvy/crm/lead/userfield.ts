import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $delete, $get, $lead, $list, $update, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmLeadUserField {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт новое поле для лидов.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $lead, $userfield, $add], param)
  }

  /**
   * Удаляет поле лидов.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $lead, $userfield, $delete], param)
  }

  /**
   * Возвращает поле лидов по коду.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $lead, $userfield, $get], param)
  }

  /**
   * Возвращает список полей лидов.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $lead, $userfield, $list], param)
  }

  /**
   * Изменяет поле лидов.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $lead, $userfield, $update], param)
  }
}

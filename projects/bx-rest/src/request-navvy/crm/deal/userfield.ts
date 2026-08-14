import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $deal, $delete, $get, $list, $update, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmDealUserField {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт новое пользовательское поле для сделок.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $deal, $userfield, $add], param)
  }

  /**
   * Удаляет пользовательское поле сделок.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $userfield, $delete], param)
  }

  /**
   * Возвращает пользовательское поле сделок по идентификатору.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $deal, $userfield, $get], param)
  }

  /**
   * Возвращает список пользовательских полей сделок.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $deal, $userfield, $list], param)
  }

  /**
   * Изменяет существующее пользовательское поле сделок.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $userfield, $update], param)
  }
}

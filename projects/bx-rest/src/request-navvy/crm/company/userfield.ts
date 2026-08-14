import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $company, $crm, $delete, $get, $list, $update, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmCompanyUserField {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт новое пользовательское поле для компаний.
   */
  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $company, $userfield, $add], param)
  }

  /**
   * Удаляет пользовательское поле компаний.
   */
  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $company, $userfield, $delete], param)
  }

  /**
   * Возвращает пользовательское поле компаний по идентификатору.
   */
  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $company, $userfield, $get], param)
  }

  /**
   * Возвращает список пользовательских полей компаний по фильтру.
   */
  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $company, $userfield, $list], param)
  }

  /**
   * Обновляет существующее пользовательское поле компаний.
   */
  update(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $company, $userfield, $update], param)
  }
}

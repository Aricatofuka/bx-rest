import { Navvy } from '../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../typification/rest/common'
import { $add, $delete, $list, $update, $userfieldtype } from '../consts/part-name-methods'

export class BXRestNavvyUserFieldType {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует новый тип пользовательских полей.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$userfieldtype, $add], param)
  }
  /**
   * Удаляет зарегистрированный приложением тип пользовательских полей.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$userfieldtype, $delete], param)
  }
  /**
   * Возвращает список типов пользовательских полей, зарегистрированных приложением.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$userfieldtype, $list], param)
  }
  /**
   * Изменяет настройки зарегистрированного приложением типа пользовательских полей.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$userfieldtype, $update], param)
  }
}

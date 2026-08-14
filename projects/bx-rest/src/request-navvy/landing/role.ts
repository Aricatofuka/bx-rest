import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $enable, $getList, $getRights, $isEnabled, $landing, $role, $setAccessCodes, $setRights } from '../../consts/part-name-methods'

export class BXRestNavvyLandingRole  {
  private readonly Navvy = new Navvy()

  /**
   * Включает модель прав доступа для приложения.
   */
  public enable(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $role, $enable], param)
  }
  /**
   * Возвращает список ролей модели прав доступа.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $role, $getList], param)
  }
  /**
   * Возвращает права роли модели прав доступа.
   */
  public getRights(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $role, $getRights], param)
  }
  /**
   * Проверяет, включена ли модель прав доступа для приложения.
   */
  public isEnabled(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $role, $isEnabled], param)
  }
  /**
   * Назначает роли коды доступа пользователей и групп.
   */
  public setAccessCodes(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $role, $setAccessCodes], param)
  }
  /**
   * Устанавливает права роли модели прав доступа.
   */
  public setRights(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $role, $setRights], param)
  }
}


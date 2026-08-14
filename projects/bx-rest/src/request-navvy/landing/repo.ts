import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $checkContent, $getList, $landing, $register, $repo, $unbind, $unregister } from '../../consts/part-name-methods'

export class BXRestNavvyLandingRepo  {
  private readonly Navvy = new Navvy()

  /**
   * Проверяет содержимое пользовательского блока перед регистрацией.
   */
  public checkContent(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repo, $checkContent], param)
  }
  /**
   * Возвращает список пользовательских блоков репозитория.
   */
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repo, $getList], param)
  }
  /**
   * Регистрирует пользовательский блок в репозитории.
   */
  public register(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repo, $register], param)
  }
  /**
   * Удаляет место встраивания, зарегистрированное текущим приложением.
   */
  public unbind(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repo, $unbind], param)
  }
  /**
   * Удаляет пользовательский блок из репозитория.
   */
  public unregister(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $repo, $unregister], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $delete, $handler, $list, $paysystem, $sale, $update } from '../../../consts/part-name-methods'

export class BXRestNavvySalePaySystemHandler  {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует обработчик платёжной системы.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $handler, $add], param)
  }
  /**
   * Удаляет обработчик платёжной системы.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $handler, $delete], param)
  }
  /**
   * Возвращает список обработчиков платёжных систем.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $handler, $list], param)
  }
  /**
   * Обновляет обработчик платёжной системы.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $paysystem, $handler, $update], param)
  }
}


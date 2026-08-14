import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $cashbox, $delete, $handler, $list, $sale, $update } from '../../../consts/part-name-methods'

export class BXRestNavvySaleCashboxHandler  {
  private readonly Navvy = new Navvy()

  /**
   * Регистрирует обработчик кассы.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $handler, $add], param)
  }
  /**
   * Удаляет обработчик кассы.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $handler, $delete], param)
  }
  /**
   * Возвращает список обработчиков касс.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $handler, $list], param)
  }
  /**
   * Обновляет обработчик кассы.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $cashbox, $handler, $update], param)
  }
}


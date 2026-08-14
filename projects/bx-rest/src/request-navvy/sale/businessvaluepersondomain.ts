import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $businessValuePersonDomain, $deleteByFilter, $getFieldsExact, $list, $sale } from '../../consts/part-name-methods'

export class BXRestNavvySaleBusinessValuePersonDomain  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет соответствие типа плательщика и типа пользовательского поля.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $businessValuePersonDomain, $add], param)
  }
  /**
   * Удаляет соответствия типа плательщика по фильтру.
   */
  public deleteByFilter(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $sale, $businessValuePersonDomain, $deleteByFilter
  ], param)
  }
  /**
   * Возвращает описание полей соответствия типа плательщика.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $businessValuePersonDomain, $getFieldsExact], param)
  }
  /**
   * Возвращает список соответствий типов плательщиков.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $businessValuePersonDomain, $list], param)
  }
}


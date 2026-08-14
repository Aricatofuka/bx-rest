import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $delete, $get, $getFieldsExact, $list, $measure, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogMeasure  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет единицу измерения.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $measure, $add], param)
  }
  /**
   * Удаляет единицу измерения.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $measure, $delete], param)
  }
  /**
   * Возвращает единицу измерения по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $measure, $get], param)
  }
  /**
   * Возвращает описание полей единицы измерения.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $measure, $getFieldsExact], param)
  }
  /**
   * Возвращает список единиц измерения.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $measure, $list], param)
  }
  /**
   * Обновляет единицу измерения.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $measure, $update], param)
  }
}


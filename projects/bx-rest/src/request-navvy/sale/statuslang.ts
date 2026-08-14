import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $deleteByFilter, $getFieldsExact, $getListLangs, $list, $sale, $statusLang } from '../../consts/part-name-methods'

export class BXRestNavvySaleStatusLang  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет локализацию статуса.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $statusLang, $add], param)
  }
  /**
   * Удаляет локализации статуса по фильтру.
   */
  public deleteByFilter(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $statusLang, $deleteByFilter], param)
  }
  /**
   * Возвращает описание полей локализации статуса.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $statusLang, $getFieldsExact], param)
  }
  /**
   * Возвращает список доступных языков локализации статусов.
   */
  public getListLangs(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $statusLang, $getListLangs], param)
  }
  /**
   * Возвращает список локализаций статусов.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $statusLang, $list], param)
  }
}


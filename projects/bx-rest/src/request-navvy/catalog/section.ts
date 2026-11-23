import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import {
  iBXRestParamCatalogGet,
  iBXRestParamCatalogSectionList
} from '../../typification/rest/catalog'
import { $add, $catalog, $delete, $get, $getFieldsExact, $list, $section, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogSection  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет раздел каталога
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $section, $add], param)
  }
  /**
   * Удаляет раздел каталога
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $section, $delete], param)
  }
  /**
   * Возвращает раздел каталога по идентификатору
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/section/catalog-section-get.html
   */
  public get(param: iBXRestParamCatalogGet) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogGet
    >([$catalog, $section, $get], param)
  }
  /**
   * Возвращает описание полей раздела каталога
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $section, $getFieldsExact], param)
  }
  /**
   * Возвращает список разделов каталога
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/section/catalog-section-list.html
   */
  public list(param: iBXRestParamCatalogSectionList) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogSectionList
    >([$catalog, $section, $list], param, 'sections')
  }
  /**
   * Обновляет раздел каталога
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $section, $update], param)
  }
}

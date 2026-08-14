import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $catalog, $delete, $download, $get, $getFieldsByFilter, $list, $product, $service, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogProductService  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет услугу.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $add], param)
  }
  /**
   * Удаляет услугу.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $delete], param)
  }
  /**
   * Скачивает изображение услуги.
   */
  public download(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $download], param)
  }
  /**
   * Возвращает услугу по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $get], param)
  }
  /**
   * Возвращает описание полей услуг с учётом фильтра.
   */
  public getFieldsByFilter(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $catalog, $product, $service, $getFieldsByFilter
  ], param)
  }
  /**
   * Возвращает список услуг.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $list], param)
  }
  /**
   * Обновляет услугу.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $product, $service, $update], param)
  }
}


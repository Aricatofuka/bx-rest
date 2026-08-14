import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $catalog, $delete, $document, $element, $getFieldsExact, $list, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogDocumentElement  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товарную позицию в документ складского учёта.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $element, $add], param)
  }
  /**
   * Удаляет товарную позицию документа складского учёта.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $element, $delete], param)
  }
  /**
   * Возвращает описание полей товарной позиции документа.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $element, $getFieldsExact], param)
  }
  /**
   * Возвращает список товарных позиций документа складского учёта.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $element, $list], param)
  }
  /**
   * Обновляет товарную позицию документа складского учёта.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $element, $update], param)
  }
}


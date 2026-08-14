import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $catalog, $delete, $documentcontractor, $getFieldsExact, $list } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogDocumentContractor  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет поставщика в документ складского учёта.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $documentcontractor, $add], param)
  }
  /**
   * Удаляет поставщика из документа складского учёта.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $documentcontractor, $delete], param)
  }
  /**
   * Возвращает описание полей поставщика документа.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $documentcontractor, $getFieldsExact], param)
  }
  /**
   * Возвращает список поставщиков документов складского учёта.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $documentcontractor, $list], param)
  }
}


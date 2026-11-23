import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { iBXRestParamCatalogUserFieldDocumentList } from '../../../typification/rest/catalog'
import { $catalog, $document, $list, $update, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogUserfieldDocument  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список пользовательских полей документов складского учёта
   * @see https://apidocs.bitrix24.ru/api-reference/catalog/userfield-document/catalog-userfield-document-list.html
   */
  public list(param: iBXRestParamCatalogUserFieldDocumentList) {
    return this.Navvy.pagNavKeyed<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamCatalogUserFieldDocumentList
    >([$catalog, $userfield, $document, $list], param, 'documents')
  }
  /**
   * Обновляет пользовательское поле документа складского учёта
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $userfield, $document, $update], param)
  }
}

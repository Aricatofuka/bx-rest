import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $catalog, $enum, $getRoundTypes, $getStoreDocumentTypes } from '../../consts/part-name-methods'

export class BXRestNavvyCatalogEnum  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает справочник типов округления цен.
   */
  public getRoundTypes(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $enum, $getRoundTypes], param)
  }
  /**
   * Возвращает справочник типов документов складского учёта.
   */
  public getStoreDocumentTypes(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([
    $catalog, $enum, $getStoreDocumentTypes
  ], param)
  }
}


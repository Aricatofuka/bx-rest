import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $catalog, $document, $list, $update, $userfield } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogUserfieldDocument  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список пользовательских полей документов складского учёта.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $userfield, $document, $list], param)
  }
  /**
   * Обновляет пользовательское поле документа складского учёта.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $userfield, $document, $update], param)
  }
}


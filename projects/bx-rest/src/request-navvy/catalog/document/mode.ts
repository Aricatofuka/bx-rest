import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $catalog, $document, $mode, $status } from '../../../consts/part-name-methods'

export class BXRestNavvyCatalogDocumentMode  {
  private readonly Navvy = new Navvy()

  public status(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$catalog, $document, $mode, $status], param)
  }
}


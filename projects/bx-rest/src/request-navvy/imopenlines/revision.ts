import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $get, $imopenlines, $revision } from '../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesRevision  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает информацию о ревизиях API.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $revision, $get], param)
  }
}


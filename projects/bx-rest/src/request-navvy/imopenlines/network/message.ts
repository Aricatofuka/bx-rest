import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $imopenlines, $message, $network } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesNetworkMessage  {
  private readonly Navvy = new Navvy()

  /**
   * Отправляет сообщение пользователю от имени открытой линии.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $network, $message, $add], param)
  }
}


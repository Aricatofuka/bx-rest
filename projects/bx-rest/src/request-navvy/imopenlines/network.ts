import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $imopenlines, $join, $network } from '../../consts/part-name-methods'
import { BXRestNavvyImOpenLinesNetworkMessage } from './network/message'

export class BXRestNavvyImOpenLinesNetwork  {
  private readonly Navvy = new Navvy()

  /**
   * Сообщения сети открытых линий (`imopenlines.network.message.*`).
   */
  public readonly message = new BXRestNavvyImOpenLinesNetworkMessage()

  /**
   * Подключает внешнюю открытую линию к порталу.
   */
  join(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $network, $join], param)
  }
}


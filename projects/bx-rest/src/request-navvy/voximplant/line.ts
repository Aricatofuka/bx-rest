import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $get, $line, $voximplant } from '../../consts/part-name-methods'
import { BXRestNavvyVoxImplantLineOutgoing } from './line/outgoing'

export class BXRestNavvyVoxImplantLine  {
  private readonly Navvy = new Navvy()

  /**
   * Исходящая линия по умолчанию (`voximplant.line.outgoing.*`).
   */
  public readonly outgoing = new BXRestNavvyVoxImplantLineOutgoing()

  /**
   * Возвращает список доступных исходящих линий.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$voximplant, $line, $get], param)
  }
}


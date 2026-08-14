import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $get, $line, $outgoing, $set, $voximplant } from '../../../consts/part-name-methods'
import { BXRestNavvyVoxImplantLineOutgoingSip } from './outgoing/sip'

export class BXRestNavvyVoxImplantLineOutgoing  {
  private readonly Navvy = new Navvy()

  /**
   * Исходящая SIP-линия по умолчанию (`voximplant.line.outgoing.sip.*`).
   */
  public readonly sip = new BXRestNavvyVoxImplantLineOutgoingSip()

  /**
   * Возвращает идентификатор текущей исходящей линии по умолчанию.
   */
  get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$voximplant, $line, $outgoing, $get], param)
  }

  /**
   * Устанавливает исходящую линию по умолчанию.
   */
  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$voximplant, $line, $outgoing, $set], param)
  }
}


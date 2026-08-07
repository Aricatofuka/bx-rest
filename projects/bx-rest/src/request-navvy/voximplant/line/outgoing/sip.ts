import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericParams } from '../../../../typification/rest/common'
import { $line, $outgoing, $set, $sip, $voximplant } from '../../../../consts/part-name-methods'

export class BXRestNavvyVoxImplantLineOutgoingSip  {
  private readonly Navvy = new Navvy()

  set(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>([$voximplant, $line, $outgoing, $sip, $set], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $get, $list, $mail, $mailbox, $senders } from '../../consts/part-name-methods'
import { BXRestNavvyMailMailboxField } from './mailbox/field'

export class BXRestNavvyMailMailbox  {
  private readonly Navvy = new Navvy()

  public readonly field = new BXRestNavvyMailMailboxField()

  get(param: iBXRestGenericParams) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $get], param)
  }

  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $list], param)
  }

  senders(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$mail, $mailbox, $senders], param)
  }
}


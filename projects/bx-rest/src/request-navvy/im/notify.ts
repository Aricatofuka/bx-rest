import { Navvy } from '../../services/navvy'
import { iBXRestImObject, iBXRestParamImNotifyAnswer, iBXRestParamImNotifyConfirm, iBXRestParamImNotifyDelete, iBXRestParamImNotifyGet, iBXRestParamImNotifySend } from '../../typification/rest/im'
import { $answer, $confirm, $delete, $get, $im, $notify } from '../../consts/part-name-methods'
import { BXRestNavvyImNotifyHistory } from './notify/history'
import { BXRestNavvyImNotifyPersonal } from './notify/personal'
import { BXRestNavvyImNotifyRead } from './notify/read'
import { BXRestNavvyImNotifySchema } from './notify/schema'
import { BXRestNavvyImNotifySystem } from './notify/system'

export class BXRestNavvyImNotify {
  private readonly Navvy = new Navvy()
  public readonly history = new BXRestNavvyImNotifyHistory()
  public readonly personal = new BXRestNavvyImNotifyPersonal()
  public readonly read = new BXRestNavvyImNotifyRead()
  public readonly schema = new BXRestNavvyImNotifySchema()
  public readonly system = new BXRestNavvyImNotifySystem()

  send(param: iBXRestParamImNotifySend) {
    return this.Navvy.simple<number, number, iBXRestParamImNotifySend>(
      [$im, $notify],
      param
    )
  }

  answer(param: iBXRestParamImNotifyAnswer) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImNotifyAnswer
    >([$im, $notify, $answer], param)
  }

  confirm(param: iBXRestParamImNotifyConfirm) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImNotifyConfirm
    >([$im, $notify, $confirm], param)
  }

  delete(param: iBXRestParamImNotifyDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImNotifyDelete>(
      [$im, $notify, $delete],
      param
    )
  }

  get(param: iBXRestParamImNotifyGet = {}) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImNotifyGet
    >([$im, $notify, $get], param)
  }
}


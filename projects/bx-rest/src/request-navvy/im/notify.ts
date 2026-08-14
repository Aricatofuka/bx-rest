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
  /**
   * История уведомлений (`im.notify.history.*`).
   */
  public readonly history = new BXRestNavvyImNotifyHistory()
  /**
   * Персональные уведомления (`im.notify.personal.*`).
   */
  public readonly personal = new BXRestNavvyImNotifyPersonal()
  /**
   * Признак прочтения уведомлений (`im.notify.read.*`).
   */
  public readonly read = new BXRestNavvyImNotifyRead()
  /**
   * Схемы типов уведомлений (`im.notify.schema.*`).
   */
  public readonly schema = new BXRestNavvyImNotifySchema()
  /**
   * Системные уведомления (`im.notify.system.*`).
   */
  public readonly system = new BXRestNavvyImNotifySystem()

  /**
   * Отправляет уведомление.
   */
  send(param: iBXRestParamImNotifySend) {
    return this.Navvy.simple<number, number, iBXRestParamImNotifySend>(
      [$im, $notify],
      param
    )
  }

  /**
   * Отвечает на уведомление с быстрым ответом.
   */
  answer(param: iBXRestParamImNotifyAnswer) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImNotifyAnswer
    >([$im, $notify, $answer], param)
  }

  /**
   * Обрабатывает нажатие кнопки уведомления.
   */
  confirm(param: iBXRestParamImNotifyConfirm) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImNotifyConfirm
    >([$im, $notify, $confirm], param)
  }

  /**
   * Удаляет уведомления.
   */
  delete(param: iBXRestParamImNotifyDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImNotifyDelete>(
      [$im, $notify, $delete],
      param
    )
  }

  /**
   * Возвращает уведомления пользователя.
   */
  get(param: iBXRestParamImNotifyGet = {}) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImNotifyGet
    >([$im, $notify, $get], param)
  }
}


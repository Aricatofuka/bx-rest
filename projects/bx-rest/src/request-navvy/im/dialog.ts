import { $dialog, $get, $im, $unread, $writing } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { BXRestNavvyImDialogUsers } from './dialog/users'
import {
  iBXRestImDialogGet,
  iBXRestImDialogGetHttp,
  iBXRestImDialogGetParam
} from '../../typification/rest/im/dialog/get'
import { BXRestMapImDialog } from '../../map/im/dialog'
import { BXRestNavvyImDialogMessages } from './dialog/messages'
import { iBXRestImDialogUnReadParam } from '../../typification/rest/im/dialog/unread'
import { iBXRestImDialogWritingParam } from '../../typification/rest/im/dialog/writing'
import { BXRestNavvyImDialogRead } from './dialog/read'

export class BXRestNavvyImDialog {

  private Navvy = new Navvy()

  public readonly users = new BXRestNavvyImDialogUsers()
  public readonly messages = new BXRestNavvyImDialogMessages()
  public readonly read = BXRestNavvyImDialogRead(this.Navvy)

  /**
   * Получить данные о чате
   *
   * @param param
   */
  get(param: iBXRestImDialogGetParam) {
    return this.Navvy.simple<iBXRestImDialogGetHttp, iBXRestImDialogGet, iBXRestImDialogGetParam>(
      [$im, $dialog, $get],
      param,
      BXRestMapImDialog.get
    )
  }

  /**
   * Установить признак «прочитано» у сообщений
   *
   * @param param
   */
  unread(param: iBXRestImDialogUnReadParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestImDialogUnReadParam>(
      [$im, $dialog, $unread],
      param,
    )
  }

  /**
   * Отправить признак «вам пишут...»
   *
   * @param param
   */
  writing(param: iBXRestImDialogWritingParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestImDialogWritingParam>(
      [$im, $dialog, $writing],
      param,
    )
  }
}
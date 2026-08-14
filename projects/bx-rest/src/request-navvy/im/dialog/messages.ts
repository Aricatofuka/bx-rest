import { $dialog, $get, $im, $messages, $search } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestImDialogMessagesGet, iBXRestImDialogMessagesGetHttp,
  iBXRestImDialogMessagesGetParam,
  iBXRestImObject,
  iBXRestParamImDialogMessagesSearch
} from '../../../typification/rest/im'
import { BXRestMapImDialogMessages } from '../../../map/im/gialog/messages'

export class BXRestNavvyImDialogMessages {

  private Navvy = new Navvy()

  /**
   * Возвращает список последних сообщений чата.
   */
  get(param: iBXRestImDialogMessagesGetParam) {
    return this.Navvy.simple<iBXRestImDialogMessagesGetHttp, iBXRestImDialogMessagesGet, iBXRestImDialogMessagesGetParam>(
      [$im, $dialog, $messages, $get],
      param,
      BXRestMapImDialogMessages.get
    )
  }

  /**
   * Ищет сообщения в чате.
   */
  search(param: iBXRestParamImDialogMessagesSearch) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImDialogMessagesSearch
    >([$im, $dialog, $messages, $search], param)
  }
}

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

  get(param: iBXRestImDialogMessagesGetParam) {
    return this.Navvy.simple<iBXRestImDialogMessagesGetHttp, iBXRestImDialogMessagesGet, iBXRestImDialogMessagesGetParam>(
      [$im, $dialog, $messages, $get],
      param,
      BXRestMapImDialogMessages.get
    )
  }

  search(param: iBXRestParamImDialogMessagesSearch) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImDialogMessagesSearch
    >([$im, $dialog, $messages, $search], param)
  }
}

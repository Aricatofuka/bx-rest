import {
  iBXRestImDialogMessagesGet,
  iBXRestImDialogMessagesGetHttp
} from '../../../typification/rest/im/dialog/messages/get'
import { toDate } from '../../../services/base'

export class BXRestMapImDialogMessages {
  static get(value: iBXRestImDialogMessagesGetHttp | undefined): iBXRestImDialogMessagesGet | undefined {
    return (value)
      ? {
        ...value,
        ...{
          messages: value.messages.map(
            mes => (
              {
                ...mes,
                ...{
                  date: toDate(mes.date),
                  params: (mes.params)
                    ? {
                      ...mes,
                      ...{
                        URL_ONLY: mes.params.URL_ONLY === 'Y',
                        IS_EDITED: mes.params.IS_DELETED === 'Y',
                        IS_DELETED: mes.params.IS_DELETED === 'Y',
                      }
                    }
                    : null
                }
              }
            )
          )
        }
      }
      : undefined
  }
}
import {
  iBXRestImDialogRecentGet,
  iBXRestImDialogRecentGetHttp,
} from '../../typification/rest/im/dialog/recent/get'
import { toDate, toNum } from '../../services/base'
import {
  iBXRestImDialogRecentList,
  iBXRestImDialogRecentListHttp
} from '../../typification/rest/im/dialog/recent/list'

export class BXRestMapImRecent {

  static get(value: iBXRestImDialogRecentGetHttp[] | undefined): iBXRestImDialogRecentGet[] | undefined {
    return value
      ? value.map(i => ({
        ...i,
        ...{
          date_update: toDate(i.date_update),
          counter: toNum(i.counter),
          user: i.user && i.user.id
            ? {
              ...i.user,
              ...{
                id: toNum(i.user.id),
                last_activity_date: i.user.last_activity_date ? toDate(i.user.last_activity_date) : false,
                mobile_last_date: i.user.mobile_last_date ? toDate(i.user.mobile_last_date) : false,
                absent: i.user.absent ? toDate(i.user.absent) : false,
              }
            }
            : undefined,
          chat: i.chat
            ? {
              ...i.chat,
              ...{
                id: toNum(i.chat.id),
                date_create: toDate(i.chat.date_create)
              }
            }
            : undefined,
        }
      }))
      : undefined
  }

  static list(value: iBXRestImDialogRecentListHttp | undefined): iBXRestImDialogRecentList | undefined {
    return (value)
      ? {
        ...value, ...{
          items: value.items.map(i => ({
            ...i, ...{
              id: toNum(i.id),
              date_update: toDate(i.date_update),
              lines: (i.lines) ? {...i.lines, ...{date_create: toDate(i.lines.date_create)}} : undefined,
              message: {...i.message, ...{date: toDate(i.message.date)}},
              chat: (i.chat) ? {...i.chat, ...{date_create: toDate(i.chat.date_create)}} : undefined,
              user: (i.user)
                ? {
                  ...i.user,
                  ...{
                    birthday: (i.user.birthday) ? toDate(i.user.birthday) : false,
                    last_activity_date: (i.user.last_activity_date) ? toDate(i.user.last_activity_date) : undefined,
                    mobile_last_date: (i.user.mobile_last_date) ? toDate(i.user.mobile_last_date) : false,
                  }
                }
                : undefined,
            }
          }))
        }
      }
      : undefined
  }
}
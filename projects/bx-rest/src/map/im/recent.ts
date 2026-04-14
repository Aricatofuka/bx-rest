import {
  iBXRestImDialogRecentGet, iBXRestImDialogRecentGetChatChatDataHttp, iBXRestImDialogRecentGetChatUserDataBase,
  iBXRestImDialogRecentGetHttp,
} from '../../typification/rest/im/dialog/recent/get'
import { toDate, toNum } from '../../services/base'
import {
  iBXRestImDialogRecentList,
  iBXRestImDialogRecentListHttp
} from '../../typification/rest/im/dialog/recent/list'
import { CatchError } from '../../functions/errorHandler'

export class BXRestMapImRecent {

  @CatchError({ rethrow: true })
  static get(value: iBXRestImDialogRecentGetHttp[] | undefined): iBXRestImDialogRecentGet[] | undefined {

      return value
        ? value.map(i => ({
          ...i,
          ...{
            date_update: toDate(i.date_update),
            counter: toNum(i.counter),
            user: BXRestMapImRecent.mapUser(i.user),
            chat: BXRestMapImRecent.mapChat(i.chat),
          }
        }))
        : undefined

  }

  @CatchError({ rethrow: true })
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

  static isIBXRestImDialogRecentGetChatChatDataHttp(item: iBXRestImDialogRecentGetChatChatDataHttp | iBXRestImDialogRecentGetChatUserDataBase): item is iBXRestImDialogRecentGetChatChatDataHttp {
    return 'id' in item
  }

  private static mapUser(user: iBXRestImDialogRecentGetHttp['user']): iBXRestImDialogRecentGet['user'] {
    if (!user || !user.id) {
      return undefined
    }

    return {
      ...user,
      id: toNum(user.id),
      last_activity_date: user.last_activity_date ? toDate(user.last_activity_date) : false,
      mobile_last_date: user.mobile_last_date ? toDate(user.mobile_last_date) : false,
      absent: user.absent ? toDate(user.absent) : false,
    }
  }

  private static mapChat(chat: iBXRestImDialogRecentGetHttp['chat']): iBXRestImDialogRecentGet['chat'] {
    if (!chat) {
      return undefined
    }

    if (BXRestMapImRecent.isIBXRestImDialogRecentGetChatChatDataHttp(chat)) {
      return {
        ...chat,
        id: toNum(chat.id),
        date_create: toDate(chat.date_create)
      }
    }

    return chat
  }
}

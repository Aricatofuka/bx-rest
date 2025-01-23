import clone from 'just-clone'
import { iBXRestUser, iBXRestUserHttp } from '../typification/rest/user/user'
import { toBool, toBXYorN, toDate, toISOStringWithTimezone, toNum, toStr } from '../services/base'

export class BXRestMapUser {

  static get(v: iBXRestUserHttp[] | undefined): iBXRestUser[] | undefined {
    return (v) ? v.map(i => BXRestMapUser.userHttpToTrace(i)) : undefined
  }

  static current(v: iBXRestUserHttp | undefined): iBXRestUser | undefined {
    return (v) ? BXRestMapUser.userHttpToTrace(v) : undefined
  }

  static userHttpToTrace(user: iBXRestUserHttp): iBXRestUser {
    let res: iBXRestUser = Object.assign(
      clone(user), {
        ID: toNum(user.ID),
        IS_ONLINE: toBool(user.IS_ONLINE),
        DATE_REGISTER: toDate(user.DATE_REGISTER),
        PERSONAL_BIRTHDAY: toDate(user.PERSONAL_BIRTHDAY),
      })
    if (user.LAST_LOGIN) {
      res.LAST_LOGIN = toDate(user.LAST_LOGIN)
    }

    return res
  }

  static BXtoHttp(user: iBXRestUser): iBXRestUserHttp {
    return Object.assign(clone(user), {
      ID: toStr(user.ID),
      IS_ONLINE: toBXYorN(user.IS_ONLINE),
      DATE_REGISTER: toISOStringWithTimezone(user.DATE_REGISTER),
      PERSONAL_BIRTHDAY: toStr(user.PERSONAL_BIRTHDAY),
      LAST_LOGIN: toStr(user.LAST_LOGIN)
    })
  }

  static getFIO(user: iBXRestUser): string {
    let res = ''
    if (!user.LAST_NAME) {
      const SECOND_NAME = (user.SECOND_NAME) ? user.SECOND_NAME : ''
      const NAME = (user.NAME) ? user.NAME : ''
      res = NAME + ' ' + SECOND_NAME
    } else if (!user.NAME) {
      res = user.LAST_NAME
    } else if (!user.SECOND_NAME) {
      res = user.LAST_NAME + ' ' + user.NAME
    } else {
      res = user.LAST_NAME + ' ' + user.NAME + ' ' + user.SECOND_NAME
    }
    return res.trim()
  }

  static getFI(user: iBXRestUser): string {
    let res = ''
    if (!user.LAST_NAME) {
      const NAME = (user.NAME) ? user.NAME : ''
      res = NAME
    } else if (!user.NAME) {
      res = user.LAST_NAME
    } else {
      res = user.LAST_NAME + ' ' + user.NAME
    }
    return res.trim()
  }

  static getFIOShort(user: iBXRestUser): string {
    let res = ''
    if (!user.LAST_NAME) {
      const SECOND_NAME = (user.SECOND_NAME) ? user.SECOND_NAME : ''
      const NAME = (user.NAME) ? user.NAME : ''
      res = NAME + ' ' + SECOND_NAME
    } else if (!user.NAME) {
      res = user.LAST_NAME
    } else if (!user.SECOND_NAME) {
      res = user.LAST_NAME + ' ' + user.NAME.charAt(0).toUpperCase() + '.'
    } else {
      res =
        user.LAST_NAME + ' ' +
        user.NAME.charAt(0).toUpperCase() + '.' +
        user.SECOND_NAME.charAt(0).toUpperCase() + '.'
    }
    return res.trim()
  }
}

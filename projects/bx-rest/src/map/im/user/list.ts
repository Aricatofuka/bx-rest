import { iBXRestImUserGet, iBXRestImUserGetHttp } from '../../../typification/rest/im/user/get'
import { BXRestMapImUser } from '../user'

export class BXRestMapImUserList {
  /** Получить данные о пользователях */
  static get(value: (iBXRestImUserGetHttp | null)[] | undefined): (iBXRestImUserGet | undefined)[] | undefined {
    return value ?
      value.map(i =>
        (i) ? BXRestMapImUser.get(i) : undefined
      )
      : undefined
  }
}
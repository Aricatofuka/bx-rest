import { Navvy } from '../../services/navvy'
import { $get, $hide, $im, $list, $pin, $recent, $unread } from '../../consts/part-name-methods'
import {
  iBXRestImDialogRecentGet,
  iBXRestImDialogRecentGetHttp,
  iBXRestImDialogRecentGetParam,
  iBXRestImDialogRecentUnreadParam,
  iBXRestImDialogRecentList, iBXRestImDialogRecentListHttp,
  iBXRestImDialogRecentListParam
} from '../../typification/rest/im'
import { BXRestMapImRecent } from '../../map/im/recent'

export class BXRestNavvyImRecent {

  private Navvy = new Navvy()

  url = {
    get: [$im, $recent, $get],
    list: [$im, $recent, $list],
    hide: [$im, $recent, $hide],
    pin: [$im, $recent, $pin],
    unread: [$im, $recent, $unread],
  }

  /**
   * Получить сокращенный список последних чатов
   */
  get(param: iBXRestImDialogRecentGetParam) {
    return this.Navvy.simple<iBXRestImDialogRecentGetHttp[], iBXRestImDialogRecentGet[], iBXRestImDialogRecentGetParam>
    (
      this.url.get,
      param,
      BXRestMapImRecent.get
    )
  }

  /**
   * Получить список чатов
   */
  list(param: iBXRestImDialogRecentListParam) {
    return this.Navvy.simple<iBXRestImDialogRecentListHttp, iBXRestImDialogRecentList, iBXRestImDialogRecentListParam>(
      this.url.list,
      param,
      BXRestMapImRecent.list
    )
  }

  /**
   * Удалить чат из списка последних
   */
  hide(param: iBXRestImDialogRecentUnreadParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestImDialogRecentUnreadParam>(this.url.unread, param)
  }

  /**
   * Закрепить чат вверху списка
   */
  pin(param: iBXRestImDialogRecentUnreadParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestImDialogRecentUnreadParam>(this.url.pin, param)
  }

  /**
   * Установить или снять признак «прочитано» у чата
   */
  unread(param: iBXRestImDialogRecentUnreadParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestImDialogRecentUnreadParam>(this.url.unread, param)
  }
}
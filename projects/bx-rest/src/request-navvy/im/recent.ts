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
import { IM_LIST_NAV, offsetNav } from '../../services/navvy/sequential-navs'

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
   * Получить список чатов.
   *
   * Страницы на портале могут перекрываться, `.resAll()` убирает повторы чатов
   */
  list(param: iBXRestImDialogRecentListParam) {
    return this.Navvy.pagNavSequential<iBXRestImDialogRecentListHttp, iBXRestImDialogRecentList, iBXRestImDialogRecentListParam>(
      this.url.list,
      param,
      offsetNav(
        IM_LIST_NAV,
        result => Boolean(result?.hasMore ?? result?.hasMorePages),
        { keys: ['items'], unique: 'id' }
      ),
      BXRestMapImRecent.list
    )
  }

  /**
   * Удалить чат из списка последних
   */
  hide(param: iBXRestImDialogRecentUnreadParam) {
    return this.Navvy.simple<boolean, boolean, iBXRestImDialogRecentUnreadParam>(this.url.hide, param)
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

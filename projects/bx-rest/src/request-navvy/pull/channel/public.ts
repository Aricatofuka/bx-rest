import { $channel, $get, $public, $pull } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestPullChannelPublicGet,
  iBXRestPullChannelPublicGetHttp
} from '../../../typification/rest/pull'
import { BXRestMapPullChannelPublic } from '../../../map/channel/public'

export class BXRestNavvyPullChannelPublic {
  url = {
    get: [$pull, $channel, $public, $get]
  }

  private Navvy = new Navvy()

  /**
   * Возвращает публичный канал Push & Pull (public_id и подпись) с ограниченным сроком действия для приёма событий без авторизации пользователя
   */
  get() {
    return this.Navvy.simple<iBXRestPullChannelPublicGetHttp,
      iBXRestPullChannelPublicGet>(this.url.get, undefined, BXRestMapPullChannelPublic.get)
  }
}

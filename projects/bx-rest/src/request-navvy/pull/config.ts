import { $config, $get, $pull } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestPullConfigGet, iBXRestPullConfigGetHttp } from '../../typification/rest/pull'
import { BXRestMapPull } from '../../map/pull'
import { BXRestMapPullChannelPublic } from '../../map/channel/public'

export class BXRestNavvyPullConfig {
  url = {
    /**
     * Получает информацию для подключения в веб сокету
     */
    get: [$pull, $config, $get]
  }

  private Navvy = new Navvy()
  public static public = new BXRestMapPullChannelPublic()

  /**
   * @experimental
   * Этот метод находится в процессе тестирования и может измениться.
   */
  get() {
    return this.Navvy.simple<iBXRestPullConfigGetHttp, iBXRestPullConfigGet>(
      this.url.get,
      undefined,
      BXRestMapPull.get
    )
  }
}
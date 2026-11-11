import { $config, $get, $pull } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestParamPullConfigGet, iBXRestPullConfigGet, iBXRestPullConfigGetHttp } from '../../typification/rest/pull'
import { BXRestMapPull } from '../../map/pull'

export class BXRestNavvyPullConfig {
  url = {
    /**
     * Получает информацию для подключения в веб сокету
     */
    get: [$pull, $config, $get]
  }

  private Navvy = new Navvy()

  /**
   * Возвращает настройки подключения к серверам Push & Pull для пользователя.
   * Приложению нужен `pull.application.config.get`: `bx.pull.application.config.get()`.
   *
   * @experimental
   * Метода нет в документации Bitrix24, ответ сверен только с официальным JS SDK.
   * Типы могут измениться.
   */
  get(param?: iBXRestParamPullConfigGet) {
    return this.Navvy.simple<iBXRestPullConfigGetHttp, iBXRestPullConfigGet, iBXRestParamPullConfigGet>(
      this.url.get,
      param,
      BXRestMapPull.get
    )
  }
}

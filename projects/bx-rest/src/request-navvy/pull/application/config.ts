import { $application, $config, $get, $pull } from '../../../consts/part-name-methods'
import {
  iBXRestParamPullConfigGet,
  iBXRestPullApplicationConfigGet,
  iBXRestPullApplicationConfigGetHttp
} from '../../../typification/rest/pull'
import { Navvy } from '../../../services/navvy'
import { BXRestMapPullApplicationConfig } from '../../../map/pull/application/config'

export class BXRestNavvyPullApplicationConfig {

  private Navvy = new Navvy()

  /**
   * Возвращает настройки подключения приложения к серверам Push & Pull: адреса сервера и каналы.
   * Настройки личные: канал `private` принадлежит пользователю, с чьим токеном идёт запрос.
   * Запрашивайте их заново, когда истекут `exp` или `end` каналов.
   *
   * Работает только в контексте приложения: через вебхук портал ответит `WRONG_AUTH_TYPE`
   *
   * @see https://apidocs.bitrix24.com/settings/interactivity/pull-application-config-get.html
   */
  get(param?: iBXRestParamPullConfigGet) {
    return this.Navvy.simple<iBXRestPullApplicationConfigGetHttp, iBXRestPullApplicationConfigGet, iBXRestParamPullConfigGet>(
      [$pull, $application, $config, $get],
      param,
      BXRestMapPullApplicationConfig.get
    )
  }
}

import { $add, $application, $event, $pull } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamPullApplicationEventAdd } from '../../../typification/rest/pull'

export class BXRestNavvyPullApplicationEvent {
  url = {
    add: [$pull, $application, $event, $add]
  }

  private Navvy = new Navvy()

  /**
   * Отправляет событие в канал приложения: в общий `shared` или, с `USER_ID`, в личные каналы
   * пользователей. Событие получает клиент Push & Pull, подписанный на эти `MODULE_ID` и `COMMAND`.
   *
   * Работает только в контексте приложения: через вебхук портал ответит `WRONG_AUTH_TYPE`.
   * `true` в ответе значит, что событие принято к отправке, а не что оно дошло до клиента.
   *
   * @see https://apidocs.bitrix24.com/settings/interactivity/pull-application-event-add.html
   */
  add(param: iBXRestParamPullApplicationEventAdd) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamPullApplicationEventAdd>(this.url.add, param)
  }
}

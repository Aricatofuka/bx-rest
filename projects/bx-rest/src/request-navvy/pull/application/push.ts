import { $add, $application, $pull, $push } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamPullApplicationPushAdd } from '../../../typification/rest/pull'

export class BXRestNavvyPullApplicationPush {
  url = {
    add: [$pull, $application, $push, $add]
  }

  private Navvy = new Navvy()

  /**
   * Отправляет push-уведомление пользователям в мобильное приложение Bitrix24 от имени приложения.
   * У приложения должно быть заполнено название на текущем языке, иначе портал ответит `EMPTY_APP_NAME`.
   *
   * Работает только в контексте приложения и только у администратора портала.
   * `true` в ответе значит, что уведомление принято к отправке, а не что оно дошло.
   *
   * @see https://apidocs.bitrix24.com/settings/interactivity/pull-application-push-add.html
   */
  add(param: iBXRestParamPullApplicationPushAdd) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamPullApplicationPushAdd>(this.url.add, param)
  }
}

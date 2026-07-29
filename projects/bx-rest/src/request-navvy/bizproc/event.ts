import {
  $bizproc,
  $event,
  $send
} from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestParamBizprocEventSend } from '../../typification/rest/bizproc'

/** События действий и роботов (`bizproc.event.*`). */
export class BXRestNavvyBizProcEvent {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Возвращает выходные значения действию или роботу. */
    send: [$bizproc, $event, $send]
  }

  /**
   * Возвращает выходные значения действию или роботу и завершает ожидание.
   *
   * Регистрация должна содержать `USE_SUBSCRIPTION: 'Y'`, а переданный
   * `EVENT_TOKEN` должен оставаться актуальным.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-robot/bizproc-event-send.html
   */
  send(param: iBXRestParamBizprocEventSend) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocEventSend>(
      this.url.send,
      param
    )
  }
}

import {
  $add,
  $crm,
  $delete,
  $get,
  $list,
  $logmessage,
  $timeline
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmTimelineLogMessage,
  iBXRestCrmTimelineLogMessageResult,
  iBXRestParamCrmTimelineLogMessageAdd,
  iBXRestParamCrmTimelineLogMessageGet,
  iBXRestParamCrmTimelineLogMessageList
} from '../../../typification/rest/crm'

/** Лог-записи приложения в таймлайне (`crm.timeline.logmessage.*`). */
export class BXRestNavvyCrmTimelineLogMessage {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет лог-запись приложения. */
    add: [$crm, $timeline, $logmessage, $add],
    /** Возвращает лог-запись по идентификатору. */
    get: [$crm, $timeline, $logmessage, $get],
    /** Возвращает лог-записи приложения для элемента CRM. */
    list: [$crm, $timeline, $logmessage, $list],
    /** Удаляет лог-запись приложения. */
    delete: [$crm, $timeline, $logmessage, $delete]
  }

  /**
   * Добавляет новую лог-запись приложения в таймлайн элемента CRM.
   *
   * Значение `iconCode` должно присутствовать в результате `crm.timeline.icon.list`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/crm-timeline-logmessage-add.html
   */
  add(param: iBXRestParamCrmTimelineLogMessageAdd) {
    return this.Navvy.simple<
      iBXRestCrmTimelineLogMessageResult,
      iBXRestCrmTimelineLogMessageResult,
      iBXRestParamCrmTimelineLogMessageAdd
    >(this.url.add, param)
  }

  /**
   * Возвращает лог-запись, ранее добавленную приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/crm-timeline-logmessage-get.html
   */
  get(param: iBXRestParamCrmTimelineLogMessageGet) {
    return this.Navvy.simple<
      iBXRestCrmTimelineLogMessageResult,
      iBXRestCrmTimelineLogMessageResult,
      iBXRestParamCrmTimelineLogMessageGet
    >(this.url.get, param)
  }

  /**
   * Возвращает лог-записи приложения для указанного элемента CRM.
   *
   * Системные записи метод не возвращает. Размер страницы REST API фиксирован
   * и равен 10 записям; `resAll()` учитывает этот размер.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/crm-timeline-logmessage-list.html
   */
  list(param: iBXRestParamCrmTimelineLogMessageList) {
    const request = this.Navvy.pagNav<
      iBXRestCrmTimelineLogMessage,
      iBXRestCrmTimelineLogMessage,
      iBXRestParamCrmTimelineLogMessageList
    >(this.url.list, param)
    request.pageSize = 10
    return request
  }

  /**
   * Удаляет лог-запись, ранее добавленную приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/crm-timeline-logmessage-delete.html
   */
  delete(param: iBXRestParamCrmTimelineLogMessageGet) {
    return this.Navvy.simple<
      boolean | null,
      boolean | null,
      iBXRestParamCrmTimelineLogMessageGet
    >(this.url.delete, param)
  }
}

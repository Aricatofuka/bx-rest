import {
  $add,
  $crm,
  $delete,
  $get,
  $icon,
  $list,
  $timeline
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmTimelineIconListResult,
  iBXRestCrmTimelineIconResult,
  iBXRestParamCrmTimelineMediaAdd,
  iBXRestParamCrmTimelineMediaGet
} from '../../../typification/rest/crm'

/** Иконки лог-записей (`crm.timeline.icon.*`). */
export class BXRestNavvyCrmTimelineIcon {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет пользовательскую иконку. */
    add: [$crm, $timeline, $icon, $add],
    /** Возвращает иконку по коду. */
    get: [$crm, $timeline, $icon, $get],
    /** Возвращает системные и пользовательские иконки. */
    list: [$crm, $timeline, $icon, $list],
    /** Удаляет пользовательскую иконку. */
    delete: [$crm, $timeline, $icon, $delete]
  }

  /**
   * Добавляет пользовательскую иконку лог-записи.
   *
   * Метод доступен только администратору. Передайте прозрачный PNG 24×24 пикселя
   * в виде Base64-строки.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/icons/crm-timeline-icon-add.html
   */
  add(param: iBXRestParamCrmTimelineMediaAdd) {
    return this.Navvy.simple<
      iBXRestCrmTimelineIconResult,
      iBXRestCrmTimelineIconResult,
      iBXRestParamCrmTimelineMediaAdd
    >(this.url.add, param)
  }

  /**
   * Возвращает системную или пользовательскую иконку по коду.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/icons/crm-timeline-icon-get.html
   */
  get(param: iBXRestParamCrmTimelineMediaGet) {
    return this.Navvy.simple<
      iBXRestCrmTimelineIconResult,
      iBXRestCrmTimelineIconResult,
      iBXRestParamCrmTimelineMediaGet
    >(this.url.get, param)
  }

  /**
   * Возвращает список всех доступных системных и пользовательских иконок.
   *
   * Поле `isSystem` отличает встроенную иконку от добавленной приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/icons/crm-timeline-icon-list.html
   */
  list() {
    return this.Navvy.simple<iBXRestCrmTimelineIconListResult>(this.url.list)
  }

  /**
   * Удаляет пользовательскую иконку. Системные иконки удалить нельзя.
   *
   * Метод доступен только администратору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/icons/crm-timeline-icon-delete.html
   */
  delete(param: iBXRestParamCrmTimelineMediaGet) {
    return this.Navvy.simple<
      boolean | null,
      boolean | null,
      iBXRestParamCrmTimelineMediaGet
    >(this.url.delete, param)
  }
}

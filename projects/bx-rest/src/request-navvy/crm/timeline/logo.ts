import {
  $add,
  $crm,
  $delete,
  $get,
  $list,
  $logo,
  $timeline
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmTimelineLogoListResult,
  iBXRestCrmTimelineLogoResult,
  iBXRestParamCrmTimelineMediaAdd,
  iBXRestParamCrmTimelineMediaGet
} from '../../../typification/rest/crm'

/** Логотипы лог-записей (`crm.timeline.logo.*`). */
export class BXRestNavvyCrmTimelineLogo {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет пользовательский логотип. */
    add: [$crm, $timeline, $logo, $add],
    /** Возвращает логотип по коду. */
    get: [$crm, $timeline, $logo, $get],
    /** Возвращает системные и пользовательские логотипы. */
    list: [$crm, $timeline, $logo, $list],
    /** Удаляет пользовательский логотип. */
    delete: [$crm, $timeline, $logo, $delete]
  }

  /**
   * Добавляет пользовательский логотип лог-записи.
   *
   * Метод доступен только администратору. Передайте прозрачный PNG 60×60 пикселей
   * в виде Base64-строки.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/logo/crm-timeline-logo-add.html
   */
  add(param: iBXRestParamCrmTimelineMediaAdd) {
    return this.Navvy.simple<
      iBXRestCrmTimelineLogoResult,
      iBXRestCrmTimelineLogoResult,
      iBXRestParamCrmTimelineMediaAdd
    >(this.url.add, param)
  }

  /**
   * Возвращает системный или пользовательский логотип по коду.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/logo/crm-timeline-logo-get.html
   */
  get(param: iBXRestParamCrmTimelineMediaGet) {
    return this.Navvy.simple<
      iBXRestCrmTimelineLogoResult,
      iBXRestCrmTimelineLogoResult,
      iBXRestParamCrmTimelineMediaGet
    >(this.url.get, param)
  }

  /**
   * Возвращает список всех доступных системных и пользовательских логотипов.
   *
   * Поле `isSystem` отличает встроенный логотип от добавленного приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/logo/crm-timeline-logo-list.html
   */
  list() {
    return this.Navvy.simple<iBXRestCrmTimelineLogoListResult>(this.url.list)
  }

  /**
   * Удаляет пользовательский логотип. Системные логотипы удалить нельзя.
   *
   * Метод доступен только администратору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/logmessage/logo/crm-timeline-logo-delete.html
   */
  delete(param: iBXRestParamCrmTimelineMediaGet) {
    return this.Navvy.simple<
      boolean | null,
      boolean | null,
      iBXRestParamCrmTimelineMediaGet
    >(this.url.delete, param)
  }
}

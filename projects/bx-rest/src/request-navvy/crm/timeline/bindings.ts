import {
  $bind,
  $bindings,
  $crm,
  $list,
  $timeline,
  $unbind
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmTimelineBinding,
  iBXRestCrmTimelineBindingFieldsDescription,
  iBXRestParamCrmTimelineBindingChange,
  iBXRestParamCrmTimelineBindingList
} from '../../../typification/rest/crm'

/** Связи записей таймлайна с элементами CRM (`crm.timeline.bindings.*`). */
export class BXRestNavvyCrmTimelineBindings {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Добавляет связь записи таймлайна с элементом CRM. */
    bind: [$crm, $timeline, $bindings, $bind],
    /** Возвращает все связи записи таймлайна. */
    list: [$crm, $timeline, $bindings, $list],
    /** Удаляет связь записи таймлайна с элементом CRM. */
    unbind: [$crm, $timeline, $bindings, $unbind],
    /** Возвращает описание полей связи. */
    fields: [$crm, $timeline, $bindings, 'fields']
  }

  /**
   * Добавляет связь записи таймлайна с элементом CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/bindings/crm-timeline-bindings-bind.html
   */
  bind(param: iBXRestParamCrmTimelineBindingChange) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmTimelineBindingChange>(
      this.url.bind,
      param
    )
  }

  /**
   * Возвращает все связи записи таймлайна по обязательному `OWNER_ID`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/bindings/crm-timeline-bindings-list.html
   */
  list(param: iBXRestParamCrmTimelineBindingList) {
    return this.Navvy.simple<
      iBXRestCrmTimelineBinding[],
      iBXRestCrmTimelineBinding[],
      iBXRestParamCrmTimelineBindingList
    >(this.url.list, param)
  }

  /**
   * Удаляет связь записи таймлайна с указанным элементом CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/bindings/crm-timeline-bindings-unbind.html
   */
  unbind(param: iBXRestParamCrmTimelineBindingChange) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmTimelineBindingChange>(
      this.url.unbind,
      param
    )
  }

  /**
   * Возвращает описание полей связи записи таймлайна с элементом CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/bindings/crm-timeline-bindings-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmTimelineBindingFieldsDescription>(this.url.fields)
  }
}

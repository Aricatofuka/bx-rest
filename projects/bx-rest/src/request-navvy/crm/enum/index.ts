import { $crm, $enum } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmEnumFields,
  iBXRestCrmEnumItem,
  iBXRestCrmOrderOwnerType
} from '../../../typification/rest/crm'
import { BXRestNavvyCrmEnumSettings } from './settings'

export * from './settings'

/** Методы перечислений CRM (`crm.enum.*`). */
export class BXRestNavvyCrmEnum {
  private readonly Navvy = new Navvy()
  private readonly url = {
    fields: [$crm, $enum, 'fields'],
    ownertype: [$crm, $enum, 'ownertype'],
    addresstype: [$crm, $enum, 'addresstype'],
    activitytype: [$crm, $enum, 'activitytype'],
    activitypriority: [$crm, $enum, 'activitypriority'],
    activitydirection: [$crm, $enum, 'activitydirection'],
    activitynotifytype: [$crm, $enum, 'activitynotifytype'],
    activitystatus: [$crm, $enum, 'activitystatus'],
    contenttype: [$crm, $enum, 'contenttype'],
    getorderownertypes: [$crm, $enum, 'getorderownertypes']
  }

  /** Перечисления настроек CRM (`crm.enum.settings.*`). */
  public readonly settings = new BXRestNavvyCrmEnumSettings()

  /**
   * Возвращает описание полей элементов перечислений CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/crm-enum-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmEnumFields>(this.url.fields)
  }

  /**
   * Возвращает типы объектов CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/crm-enum-owner-type.html
   */
  ownertype() {
    return this.enumItems(this.url.ownertype)
  }

  /**
   * Возвращает типы адресов CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/crm-enum-address-type.html
   */
  addresstype() {
    return this.enumItems(this.url.addresstype)
  }

  /**
   * Возвращает значения поля `TYPE_ID` дел CRM.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.activity.todo.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-type.html
   */
  activitytype() {
    return this.enumItems(this.url.activitytype)
  }

  /**
   * Возвращает приоритеты дел CRM.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.activity.todo.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-priority.html
   */
  activitypriority() {
    return this.enumItems(this.url.activitypriority)
  }

  /**
   * Возвращает направления активности: входящее и исходящее.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.activity.todo.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-direction.html
   */
  activitydirection() {
    return this.enumItems(this.url.activitydirection)
  }

  /**
   * Возвращает типы уведомлений о начале активности.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.activity.todo.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-notify-type.html
   */
  activitynotifytype() {
    return this.enumItems(this.url.activitynotifytype)
  }

  /**
   * Возвращает статусы активности.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.activity.todo.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-status.html
   */
  activitystatus() {
    return this.enumItems(this.url.activitystatus)
  }

  /**
   * Возвращает типы описания дел: plain text, bbCode и HTML.
   *
   * @deprecated Развитие метода остановлено. Используйте `crm.activity.todo.*`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/outdated/crm-enum-content-type.html
   */
  contenttype() {
    return this.enumItems(this.url.contenttype)
  }

  /**
   * Возвращает типы объектов, к которым можно привязать заказ.
   * Идентификатор результата передаётся как `ownerTypeId` в `crm.orderentity.*`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/auxiliary/enum/crm-enum-get-order-owner-types.html
   */
  getorderownertypes() {
    return this.Navvy.simple<iBXRestCrmOrderOwnerType[]>(this.url.getorderownertypes)
  }

  private enumItems(url: string[]) {
    return this.Navvy.simple<iBXRestCrmEnumItem[]>(url)
  }
}

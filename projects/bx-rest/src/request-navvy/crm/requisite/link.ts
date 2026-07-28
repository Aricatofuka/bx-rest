import {
  $crm,
  $get,
  $link,
  $list,
  $register,
  $requisite,
  $unregister
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmRequisiteFieldsDescription,
  iBXRestCrmRequisiteLinkFields,
  iBXRestParamCrmRequisiteLinkGet,
  iBXRestParamCrmRequisiteLinkList,
  iBXRestParamCrmRequisiteLinkRegister,
  iBXRestParamCrmRequisiteLinkUnregister
} from '../../../typification/rest/crm'

/** Связи реквизитов с объектами CRM (`crm.requisite.link.*`). */
export class BXRestNavvyCrmRequisiteLink {
  private readonly Navvy = new Navvy()
  private readonly url = {
    register: [$crm, $requisite, $link, $register],
    get: [$crm, $requisite, $link, $get],
    list: [$crm, $requisite, $link, $list],
    unregister: [$crm, $requisite, $link, $unregister],
    fields: [$crm, $requisite, $link, 'fields']
  }

  /**
   * Регистрирует реквизиты покупателя и, при необходимости, продавца у объекта CRM.
   *
   * `REQUISITE_ID`/`BANK_DETAIL_ID` относятся к клиенту, поля с префиксом `MC_` —
   * к своей компании.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/links/crm-requisite-link-register.html
   */
  register(param: iBXRestParamCrmRequisiteLinkRegister) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteLinkRegister
    >(this.url.register, param)
  }

  /**
   * Возвращает связь реквизитов с конкретным объектом CRM.
   *
   * Обратите внимание: API принимает параметры `entityTypeId` и `entityId`
   * в camelCase.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/links/crm-requisite-link-get.html
   */
  get(param: iBXRestParamCrmRequisiteLinkGet) {
    return this.Navvy.simple<
      iBXRestCrmRequisiteLinkFields,
      iBXRestCrmRequisiteLinkFields,
      iBXRestParamCrmRequisiteLinkGet
    >(this.url.get, param)
  }

  /**
   * Возвращает список связей реквизитов по фильтру и сортировке.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/links/crm-requisite-link-list.html
   */
  list(param: iBXRestParamCrmRequisiteLinkList = {}) {
    return this.Navvy.simple<
      iBXRestCrmRequisiteLinkFields[],
      iBXRestCrmRequisiteLinkFields[],
      iBXRestParamCrmRequisiteLinkList
    >(this.url.list, param)
  }

  /**
   * Удаляет связь реквизитов с объектом, не удаляя сами реквизиты.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/links/crm-requisite-link-unregister.html
   */
  unregister(param: iBXRestParamCrmRequisiteLinkUnregister) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteLinkUnregister
    >(this.url.unregister, param)
  }

  /**
   * Возвращает формальное описание полей связи реквизитов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/links/crm-requisite-link-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmRequisiteFieldsDescription>(this.url.fields)
  }
}

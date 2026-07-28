import {
  $add,
  $crm,
  $delete,
  $get,
  $list,
  $requisite,
  $update,
  $userfield
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmRequisiteUserField,
  iBXRestParamCrmRequisiteUserFieldAdd,
  iBXRestParamCrmRequisiteUserFieldDelete,
  iBXRestParamCrmRequisiteUserFieldGet,
  iBXRestParamCrmRequisiteUserFieldList,
  iBXRestParamCrmRequisiteUserFieldUpdate
} from '../../../typification/rest/crm'

/** Пользовательские поля реквизитов (`crm.requisite.userfield.*`). */
export class BXRestNavvyCrmRequisiteUserField {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $requisite, $userfield, $add],
    update: [$crm, $requisite, $userfield, $update],
    get: [$crm, $requisite, $userfield, $get],
    list: [$crm, $requisite, $userfield, $list],
    delete: [$crm, $requisite, $userfield, $delete]
  }

  /**
   * Создает пользовательское поле реквизита.
   *
   * Передавайте `ENTITY_ID: 'CRM_REQUISITE'`; `FIELD_NAME` задается без префикса
   * `UF_CRM_`. Для типа `enumeration` варианты передаются в `LIST`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/user-fields/crm-requisite-userfield-add.html
   */
  add(param: iBXRestParamCrmRequisiteUserFieldAdd) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCrmRequisiteUserFieldAdd
    >(this.url.add, param)
  }

  /**
   * Изменяет пользовательское поле реквизита.
   *
   * Тип и символьный код существующего поля изменить нельзя.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/user-fields/crm-requisite-userfield-update.html
   */
  update(param: iBXRestParamCrmRequisiteUserFieldUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteUserFieldUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает пользовательское поле реквизита по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/user-fields/crm-requisite-userfield-get.html
   */
  get(param: iBXRestParamCrmRequisiteUserFieldGet) {
    return this.Navvy.simple<
      iBXRestCrmRequisiteUserField,
      iBXRestCrmRequisiteUserField,
      iBXRestParamCrmRequisiteUserFieldGet
    >(this.url.get, param)
  }

  /**
   * Возвращает пользовательские поля реквизитов по фильтру.
   *
   * Язык подписей можно выбрать через `filter.LANG`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/user-fields/crm-requisite-userfield-list.html
   */
  list(param: iBXRestParamCrmRequisiteUserFieldList = {}) {
    return this.Navvy.simple<
      iBXRestCrmRequisiteUserField[],
      iBXRestCrmRequisiteUserField[],
      iBXRestParamCrmRequisiteUserFieldList
    >(this.url.list, param)
  }

  /**
   * Удаляет пользовательское поле реквизита.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/user-fields/crm-requisite-userfield-delete.html
   */
  delete(param: iBXRestParamCrmRequisiteUserFieldDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteUserFieldDelete
    >(this.url.delete, param)
  }
}

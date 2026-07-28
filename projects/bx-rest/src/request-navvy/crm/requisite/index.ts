import {
  $add,
  $crm,
  $delete,
  $get,
  $list,
  $requisite,
  $update
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmRequisite,
  iBXRestCrmRequisiteFieldsDescription,
  iBXRestParamCrmRequisiteAdd,
  iBXRestParamCrmRequisiteDelete,
  iBXRestParamCrmRequisiteGet,
  iBXRestParamCrmRequisiteList,
  iBXRestParamCrmRequisiteUpdate
} from '../../../typification/rest/crm'
import { BXRestNavvyCrmRequisiteBankDetail } from './bankdetail'
import { BXRestNavvyCrmRequisiteLink } from './link'
import { BXRestNavvyCrmRequisitePreset } from './preset/index'
import { BXRestNavvyCrmRequisiteUserField } from './userfield'

export * from './bankdetail'
export * from './link'
export * from './preset/index'
export * from './userfield'

/** Реквизиты компаний и контактов (`crm.requisite.*`). */
export class BXRestNavvyCrmRequisite {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $requisite, $add],
    update: [$crm, $requisite, $update],
    get: [$crm, $requisite, $get],
    list: [$crm, $requisite, $list],
    delete: [$crm, $requisite, $delete],
    fields: [$crm, $requisite, 'fields']
  }

  /** Банковские реквизиты (`crm.requisite.bankdetail.*`). */
  public readonly bankdetail = new BXRestNavvyCrmRequisiteBankDetail()
  /** Пользовательские поля реквизитов (`crm.requisite.userfield.*`). */
  public readonly userfield = new BXRestNavvyCrmRequisiteUserField()
  /** Связи реквизитов с объектами CRM (`crm.requisite.link.*`). */
  public readonly link = new BXRestNavvyCrmRequisiteLink()
  /** Шаблоны реквизитов (`crm.requisite.preset.*`). */
  public readonly preset = new BXRestNavvyCrmRequisitePreset()

  /**
   * Создает реквизит компании или контакта.
   *
   * `ENTITY_TYPE_ID` принимает `3` для контакта или `4` для компании.
   * Набор полей `RQ_*` зависит от выбранного `PRESET_ID`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/universal/crm-requisite-add.html
   */
  add(param: iBXRestParamCrmRequisiteAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmRequisiteAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Изменяет реквизит, включая его стандартные `RQ_*` и пользовательские `UF_CRM_*` поля.
   *
   * Адреса и банковские реквизиты изменяются отдельными вложенными навигаторами.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/universal/crm-requisite-update.html
   */
  update(param: iBXRestParamCrmRequisiteUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает реквизит по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/universal/crm-requisite-get.html
   */
  get(param: iBXRestParamCrmRequisiteGet) {
    return this.Navvy.simple<
      iBXRestCrmRequisite,
      iBXRestCrmRequisite,
      iBXRestParamCrmRequisiteGet
    >(this.url.get, param)
  }

  /**
   * Возвращает реквизиты по фильтру.
   *
   * Пользовательские поля не входят в результат по умолчанию: нужные `UF_CRM_*`
   * следует явно передать в `select`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/universal/crm-requisite-list.html
   */
  list(param: iBXRestParamCrmRequisiteList = {}) {
    return this.Navvy.pagNav<
      iBXRestCrmRequisite,
      iBXRestCrmRequisite,
      iBXRestParamCrmRequisiteList
    >(this.url.list, param)
  }

  /**
   * Удаляет реквизит вместе со связанными адресами, банковскими реквизитами и связями.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/universal/crm-requisite-delete.html
   */
  delete(param: iBXRestParamCrmRequisiteDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteDelete
    >(this.url.delete, param)
  }

  /**
   * Возвращает формальное описание полей реквизита, включая зарегистрированные `UF_CRM_*`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/universal/crm-requisite-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmRequisiteFieldsDescription>(this.url.fields)
  }
}

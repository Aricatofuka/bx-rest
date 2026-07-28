import {
  $add,
  $availabletoadd,
  $crm,
  $delete,
  $field,
  $get,
  $list,
  $preset,
  $requisite,
  $update
} from '../../../../consts/part-name-methods'
import { Navvy } from '../../../../services/navvy'
import {
  iBXRestCrmRequisiteFieldsDescription,
  iBXRestCrmRequisitePresetField,
  iBXRestParamCrmRequisitePresetFieldAdd,
  iBXRestParamCrmRequisitePresetFieldAvailableToAdd,
  iBXRestParamCrmRequisitePresetFieldDelete,
  iBXRestParamCrmRequisitePresetFieldGet,
  iBXRestParamCrmRequisitePresetFieldList,
  iBXRestParamCrmRequisitePresetFieldUpdate
} from '../../../../typification/rest/crm'

/** Настраиваемые поля шаблона реквизитов (`crm.requisite.preset.field.*`). */
export class BXRestNavvyCrmRequisitePresetField {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $requisite, $preset, $field, $add],
    update: [$crm, $requisite, $preset, $field, $update],
    availableToAdd: [$crm, $requisite, $preset, $field, $availabletoadd],
    get: [$crm, $requisite, $preset, $field, $get],
    list: [$crm, $requisite, $preset, $field, $list],
    delete: [$crm, $requisite, $preset, $field, $delete],
    fields: [$crm, $requisite, $preset, $field, 'fields']
  }

  /**
   * Добавляет настраиваемое поле в шаблон реквизитов.
   *
   * Пользовательское поле `UF_*` сначала нужно создать через
   * `crm.requisite.userfield.add`. Список допустимых полей возвращает `availableToAdd()`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-add.html
   */
  add(param: iBXRestParamCrmRequisitePresetFieldAdd) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCrmRequisitePresetFieldAdd
    >(this.url.add, param)
  }

  /**
   * Изменяет настраиваемое поле заданного шаблона.
   *
   * API ожидает идентификатор поля в верхнерегистровом `ID`, а идентификатор
   * шаблона — в `preset.ID`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-update.html
   */
  update(param: iBXRestParamCrmRequisitePresetFieldUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisitePresetFieldUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает имена полей, которые еще можно добавить в указанный шаблон.
   *
   * Доступный набор зависит от страны шаблона.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-available-to-add.html
   */
  availableToAdd(param: iBXRestParamCrmRequisitePresetFieldAvailableToAdd) {
    return this.Navvy.simple<
      string[],
      string[],
      iBXRestParamCrmRequisitePresetFieldAvailableToAdd
    >(this.url.availableToAdd, param)
  }

  /**
   * Возвращает настраиваемое поле шаблона по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-get.html
   */
  get(param: iBXRestParamCrmRequisitePresetFieldGet) {
    return this.Navvy.simple<
      iBXRestCrmRequisitePresetField,
      iBXRestCrmRequisitePresetField,
      iBXRestParamCrmRequisitePresetFieldGet
    >(this.url.get, param)
  }

  /**
   * Возвращает все настраиваемые поля заданного шаблона.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-list.html
   */
  list(param: iBXRestParamCrmRequisitePresetFieldList) {
    return this.Navvy.simple<
      iBXRestCrmRequisitePresetField[],
      iBXRestCrmRequisitePresetField[],
      iBXRestParamCrmRequisitePresetFieldList
    >(this.url.list, param)
  }

  /**
   * Удаляет настраиваемое поле из шаблона, не удаляя пользовательское поле `UF_*`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-delete.html
   */
  delete(param: iBXRestParamCrmRequisitePresetFieldDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisitePresetFieldDelete
    >(this.url.delete, param)
  }

  /**
   * Возвращает формальное описание настраиваемых полей шаблона.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmRequisiteFieldsDescription>(this.url.fields)
  }
}

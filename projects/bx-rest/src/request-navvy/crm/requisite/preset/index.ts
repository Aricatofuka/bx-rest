import {
  $add,
  $countries,
  $crm,
  $delete,
  $get,
  $list,
  $preset,
  $requisite,
  $update
} from '../../../../consts/part-name-methods'
import { Navvy } from '../../../../services/navvy'
import {
  iBXRestCrmRequisiteFieldsDescription,
  iBXRestCrmRequisitePreset,
  iBXRestCrmRequisitePresetCountry,
  iBXRestParamCrmRequisitePresetAdd,
  iBXRestParamCrmRequisitePresetDelete,
  iBXRestParamCrmRequisitePresetGet,
  iBXRestParamCrmRequisitePresetList,
  iBXRestParamCrmRequisitePresetUpdate
} from '../../../../typification/rest/crm'
import { BXRestNavvyCrmRequisitePresetField } from './field'

export * from './field'

/** Шаблоны реквизитов (`crm.requisite.preset.*`). */
export class BXRestNavvyCrmRequisitePreset {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $requisite, $preset, $add],
    update: [$crm, $requisite, $preset, $update],
    countries: [$crm, $requisite, $preset, $countries],
    get: [$crm, $requisite, $preset, $get],
    list: [$crm, $requisite, $preset, $list],
    delete: [$crm, $requisite, $preset, $delete],
    fields: [$crm, $requisite, $preset, 'fields']
  }

  /** Настраиваемые поля шаблона (`crm.requisite.preset.field.*`). */
  public readonly field = new BXRestNavvyCrmRequisitePresetField()

  /**
   * Создает шаблон реквизитов для выбранной страны.
   *
   * Родительский тип шаблона всегда `ENTITY_TYPE_ID: 8`. Доступные страны
   * возвращает `countries()`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/crm-requisite-preset-add.html
   */
  add(param: iBXRestParamCrmRequisitePresetAdd) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCrmRequisitePresetAdd
    >(this.url.add, param)
  }

  /**
   * Изменяет существующий шаблон реквизитов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/crm-requisite-preset-update.html
   */
  update(param: iBXRestParamCrmRequisitePresetUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisitePresetUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает страны, для которых Bitrix24 предоставляет наборы полей реквизитов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/crm-requisite-preset-countries.html
   */
  countries() {
    return this.Navvy.simple<iBXRestCrmRequisitePresetCountry[]>(
      this.url.countries
    )
  }

  /**
   * Возвращает шаблон реквизитов по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/crm-requisite-preset-get.html
   */
  get(param: iBXRestParamCrmRequisitePresetGet) {
    return this.Navvy.simple<
      iBXRestCrmRequisitePreset,
      iBXRestCrmRequisitePreset,
      iBXRestParamCrmRequisitePresetGet
    >(this.url.get, param)
  }

  /**
   * Возвращает шаблоны реквизитов по фильтру.
   *
   * Поддерживает выборку `select`, сортировку `order` и постраничную навигацию.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/crm-requisite-preset-list.html
   */
  list(param: iBXRestParamCrmRequisitePresetList = {}) {
    return this.Navvy.pagNav<
      iBXRestCrmRequisitePreset,
      iBXRestCrmRequisitePreset,
      iBXRestParamCrmRequisitePresetList
    >(this.url.list, param)
  }

  /**
   * Удаляет шаблон реквизитов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/crm-requisite-preset-delete.html
   */
  delete(param: iBXRestParamCrmRequisitePresetDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisitePresetDelete
    >(this.url.delete, param)
  }

  /**
   * Возвращает формальное описание полей шаблона реквизитов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/presets/crm-requisite-preset-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmRequisiteFieldsDescription>(this.url.fields)
  }
}

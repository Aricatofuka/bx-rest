import { $crm, $duplicate, $list, $register, $unregister, $volatileType } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmDuplicateVolatileType,
  iBXRestCrmDuplicateVolatileTypeField,
  iBXRestCrmDuplicateVolatileTypeRegisterResult,
  iBXRestParamCrmDuplicateVolatileTypeFields,
  iBXRestParamCrmDuplicateVolatileTypeRegister,
  iBXRestParamCrmDuplicateVolatileTypeUnregister
} from '../../../typification/rest/crm'

/** Настройка дополнительных полей поиска дубликатов (`crm.duplicate.volatileType.*`). */
export class BXRestNavvyCrmDuplicateVolatileType {
  private readonly Navvy = new Navvy()
  private readonly url = {
    fields: [$crm, $duplicate, $volatileType, 'fields'],
    list: [$crm, $duplicate, $volatileType, $list],
    register: [$crm, $duplicate, $volatileType, $register],
    unregister: [$crm, $duplicate, $volatileType, $unregister]
  }

  /**
   * Возвращает стандартные и пользовательские поля, доступные для поиска дубликатов.
   *
   * @param param Необязательный тип CRM-объекта: `1` — лид, `3` — контакт, `4` — компания.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/duplicates/volatile-type/crm-duplicate-volatile-type-fields.html
   */
  fields(param: iBXRestParamCrmDuplicateVolatileTypeFields = {}) {
    return this.Navvy.simple<
      iBXRestCrmDuplicateVolatileTypeField[],
      iBXRestCrmDuplicateVolatileTypeField[],
      iBXRestParamCrmDuplicateVolatileTypeFields
    >(this.url.fields, param)
  }

  /**
   * Возвращает нестандартные поля, уже участвующие в поиске дубликатов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/duplicates/volatile-type/crm-duplicate-volatile-type-list.html
   */
  list() {
    return this.Navvy.simple<iBXRestCrmDuplicateVolatileType[]>(this.url.list)
  }

  /**
   * Добавляет стандартное или пользовательское поле в поиск дубликатов.
   * Суммарно для лидов, контактов и компаний можно зарегистрировать до семи полей.
   *
   * @param param Тип CRM-объекта и код поля из результата метода `fields`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/duplicates/volatile-type/crm-duplicate-volatile-type-register.html
   */
  register(param: iBXRestParamCrmDuplicateVolatileTypeRegister) {
    return this.Navvy.simple<
      iBXRestCrmDuplicateVolatileTypeRegisterResult,
      iBXRestCrmDuplicateVolatileTypeRegisterResult,
      iBXRestParamCrmDuplicateVolatileTypeRegister
    >(this.url.register, param)
  }

  /**
   * Удаляет нестандартное поле из поиска дубликатов.
   *
   * @param param Идентификатор записи из результата метода `list` или `register`.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/duplicates/volatile-type/crm-duplicate-volatile-type-unregister.html
   */
  unregister(param: iBXRestParamCrmDuplicateVolatileTypeUnregister) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmDuplicateVolatileTypeUnregister
    >(this.url.unregister, param)
  }
}

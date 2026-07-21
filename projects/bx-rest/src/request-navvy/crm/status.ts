import { $add, $crm, $delete, $get, $list, $status, $update } from '../../consts/part-name-methods'
import { BXRestMapCrmStatus } from '../../map/crm'
import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmStatus,
  iBXRestCrmStatusFields,
  iBXRestCrmStatusHttp,
  iBXRestParamCrmStatusAdd,
  iBXRestParamCrmStatusDelete,
  iBXRestParamCrmStatusGet,
  iBXRestParamCrmStatusList,
  iBXRestParamCrmStatusUpdate
} from '../../typification/rest/crm'
import { BXRestNavvyCrmStatusEntity } from './status/entity'

export * from './status/entity'

/** Навигатор REST-методов справочников CRM (`crm.status.*`). */
export class BXRestNavvyCrmStatus {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $status, $add],
    update: [$crm, $status, $update],
    get: [$crm, $status, $get],
    list: [$crm, $status, $list],
    delete: [$crm, $status, $delete],
    fields: [$crm, $status, 'fields']
  }

  /** Типы справочников и получение их элементов (`crm.status.entity.*`). */
  public readonly entity = new BXRestNavvyCrmStatusEntity()

  /**
   * Создает новый элемент в указанном справочнике CRM.
   * Для стадий пользовательских воронок Bitrix24 автоматически добавляет к `STATUS_ID` префикс воронки.
   *
   * @param param Тип справочника и поля нового элемента.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-add.html
   */
  add(param: iBXRestParamCrmStatusAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmStatusAdd>(this.url.add, param)
  }

  /**
   * Обновляет название, сортировку или цвет существующего элемента справочника.
   *
   * @param param Идентификатор элемента и изменяемые поля.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-update.html
   */
  update(param: iBXRestParamCrmStatusUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmStatusUpdate>(this.url.update, param)
  }

  /**
   * Возвращает элемент справочника по числовому идентификатору.
   *
   * @param param Идентификатор элемента справочника.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-get.html
   */
  get(param: iBXRestParamCrmStatusGet) {
    return this.Navvy.simple<
      iBXRestCrmStatusHttp,
      iBXRestCrmStatus,
      iBXRestParamCrmStatusGet
    >(this.url.get, param, BXRestMapCrmStatus.get)
  }

  /**
   * Возвращает список элементов справочников по фильтру с заданной сортировкой.
   * Навигатор поддерживает получение всех страниц результата через `resAll()`.
   *
   * @param param Фильтр, сортировка и начальная позиция страницы.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-list.html
   */
  list(param: iBXRestParamCrmStatusList = {}) {
    return this.Navvy.pagNav<
      iBXRestCrmStatusHttp,
      iBXRestCrmStatus,
      iBXRestParamCrmStatusList
    >(this.url.list, param, BXRestMapCrmStatus.list)
  }

  /**
   * Удаляет элемент справочника.
   * Для системного элемента передайте `params.FORCED: 'Y'`.
   *
   * @param param Идентификатор элемента и необязательный флаг принудительного удаления.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-delete.html
   */
  delete(param: iBXRestParamCrmStatusDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmStatusDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей элементов справочников CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/status/crm-status-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmStatusFields>(this.url.fields)
  }
}

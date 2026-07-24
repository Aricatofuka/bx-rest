import {
  $add,
  $calllist,
  $crm,
  $get,
  $list,
  $statuslist,
  $update
} from '../../../consts/part-name-methods'
import { BXRestMapCrmCallList } from '../../../map/crm'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmCallList,
  iBXRestCrmCallListHttp,
  iBXRestCrmCallListListItem,
  iBXRestCrmCallListListItemHttp,
  iBXRestCrmCallListStatus,
  iBXRestParamCrmCallListAdd,
  iBXRestParamCrmCallListGet,
  iBXRestParamCrmCallListList,
  iBXRestParamCrmCallListUpdate
} from '../../../typification/rest/crm'
import { BXRestNavvyCrmCallListItems } from './items'

export * from './items'

/** Навигатор REST-методов списков обзвона (`crm.calllist.*`). */
export class BXRestNavvyCrmCallList {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $calllist, $add],
    get: [$crm, $calllist, $get],
    list: [$crm, $calllist, $list],
    statusList: [$crm, $calllist, $statuslist],
    update: [$crm, $calllist, $update]
  }

  /** Участники списка обзвона (`crm.calllist.items.*`). */
  public readonly items = new BXRestNavvyCrmCallListItems()

  /**
   * Создает список обзвона из контактов или компаний.
   *
   * В одном списке могут находиться объекты только одного типа, заданного в `ENTITY_TYPE`.
   *
   * @param param Тип объектов, их идентификаторы и необязательная CRM-форма.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/call-list/crm-calllist-add.html
   */
  add(param: iBXRestParamCrmCallListAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmCallListAdd>(this.url.add, param)
  }

  /**
   * Возвращает данные списка обзвона по идентификатору без списка участников.
   *
   * Участников можно получить через `items.get()`.
   *
   * @param param Идентификатор списка обзвона.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/call-list/crm-calllist-get.html
   */
  get(param: iBXRestParamCrmCallListGet) {
    return this.Navvy.simple<
      iBXRestCrmCallListHttp,
      iBXRestCrmCallList,
      iBXRestParamCrmCallListGet
    >(this.url.get, param, BXRestMapCrmCallList.get)
  }

  /**
   * Возвращает списки обзвона с выборкой полей, фильтрацией и сортировкой.
   *
   * Набор полей каждого элемента результата зависит от `SELECT`.
   *
   * @param param Выбираемые поля, фильтр и порядок сортировки.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/call-list/crm-calllist-list.html
   */
  list(param: iBXRestParamCrmCallListList = {}) {
    return this.Navvy.simple<
      iBXRestCrmCallListListItemHttp[],
      iBXRestCrmCallListListItem[],
      iBXRestParamCrmCallListList
    >(this.url.list, param, BXRestMapCrmCallList.list)
  }

  /**
   * Возвращает справочник статусов обзвона.
   *
   * Значение `STATUS_ID` можно передать в `items.get({ FILTER: { STATUS } })`.
   * Создание, изменение и удаление статусов выполняется методами `crm.status.*`
   * со значением `ENTITY_ID: 'CALL_LIST'`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/call-list/crm-calllist-statuslist.html
   */
  statusList() {
    return this.Navvy.simple<iBXRestCrmCallListStatus[]>(this.url.statusList)
  }

  /**
   * Заменяет состав существующего списка обзвона и обновляет связанную CRM-форму.
   *
   * `ENTITIES` перезаписывается целиком: чтобы добавить участников, передайте и текущие,
   * и новые идентификаторы; чтобы удалить — только те, которые должны остаться.
   * Если `WEBFORM_ID` не передан, ранее установленная CRM-форма будет очищена.
   *
   * @param param Идентификатор списка и его новый полный состав.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/call-list/crm-calllist-update.html
   */
  update(param: iBXRestParamCrmCallListUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCallListUpdate>(
      this.url.update,
      param
    )
  }
}

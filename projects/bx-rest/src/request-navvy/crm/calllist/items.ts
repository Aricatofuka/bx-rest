import { $calllist, $crm, $get, $items } from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmCallListItem,
  iBXRestParamCrmCallListItemsGet
} from '../../../typification/rest/crm'

/** Участники списка обзвона (`crm.calllist.items.*`). */
export class BXRestNavvyCrmCallListItems {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$crm, $calllist, $items, $get]
  }

  /**
   * Возвращает контакты или компании из списка обзвона вместе с их текущими статусами.
   *
   * Для фильтрации передайте `FILTER.STATUS`; доступные коды возвращает
   * `crm.calllist.statuslist`.
   *
   * @param param Идентификатор списка и необязательный фильтр по статусу.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/call-list/crm-calllist-items-get.html
   */
  get(param: iBXRestParamCrmCallListItemsGet) {
    return this.Navvy.simple<
      iBXRestCrmCallListItem[],
      iBXRestCrmCallListItem[],
      iBXRestParamCrmCallListItemsGet
    >(this.url.get, param)
  }
}

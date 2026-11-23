import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestParamCrmStageHistoryList
} from '../../typification/rest/crm'
import { $crm, $list, $stagehistory } from '../../consts/part-name-methods'

export class BXRestNavvyCrmStageHistory {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает историю движения элемента по стадиям
   * @see https://apidocs.bitrix24.ru/api-reference/crm/crm-stage-history-list.html
   */
  list(param: iBXRestParamCrmStageHistoryList = {}) {
    return this.Navvy.pagNavKeyed<
      { items?: iBXRestCrmObject[] },
      { items?: iBXRestCrmObject[] },
      iBXRestParamCrmStageHistoryList
    >([$crm, $stagehistory, $list], param, 'items')
  }
}

import { Navvy } from '../../../services/navvy'
import { iBXRestParamTimemanRecordFieldGet, iBXRestParamTimemanRecordFieldList, iBXRestTimemanItemResult, iBXRestTimemanItemsResult } from '../../../typification/rest/timeman'
import { $field, $get, $list, $record, $timeMan } from '../../../consts/part-name-methods'

export class BXRestNavvyTimemanRecordField {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля записи о рабочем времени.
   */
  get(param: iBXRestParamTimemanRecordFieldGet) {
    return this.Navvy.simple<
      iBXRestTimemanItemResult,
      iBXRestTimemanItemResult,
      iBXRestParamTimemanRecordFieldGet
    >([$timeMan, $record, $field, $get], param)
  }

  /**
   * Возвращает список полей записи о рабочем времени.
   */
  list(param: iBXRestParamTimemanRecordFieldList = {}) {
    return this.Navvy.simple<
      iBXRestTimemanItemsResult,
      iBXRestTimemanItemsResult,
      iBXRestParamTimemanRecordFieldList
    >([$timeMan, $record, $field, $list], param)
  }
}


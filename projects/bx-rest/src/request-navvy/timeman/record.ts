import { Navvy } from '../../services/navvy'
import { iBXRestParamTimemanRecordList, iBXRestTimemanItemsResult } from '../../typification/rest/timeman'
import { $list, $record, $timeMan } from '../../consts/part-name-methods'
import { restV3PageNav } from '../../services/navvy/sequential-navs'
import { EVENTLOG_TIMEMAN_MAX_PAGE_SIZE, PAGE_SIZE } from '../../consts/page-size'
import { BXRestNavvyTimemanRecordField } from './record/field'

export class BXRestNavvyTimemanRecord {
  private readonly Navvy = new Navvy()
  /**
   * Поля записи о рабочем времени (`timeman.record.field.*`).
   */
  public readonly field = new BXRestNavvyTimemanRecordField()

  /**
   * Возвращает список записей о рабочем времени сотрудника
   */
  list(param: iBXRestParamTimemanRecordList) {
    return this.Navvy.pagNavSequentialV3<
      iBXRestTimemanItemsResult,
      iBXRestTimemanItemsResult,
      iBXRestParamTimemanRecordList
    >([$timeMan, $record, $list], param, restV3PageNav(PAGE_SIZE, EVENTLOG_TIMEMAN_MAX_PAGE_SIZE))
  }
}

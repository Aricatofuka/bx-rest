import { Navvy } from '../../services/navvy'
import { iBXRestParamTimemanRecordList, iBXRestTimemanItemsResult } from '../../typification/rest/timeman'
import { $list, $record, $timeMan } from '../../consts/part-name-methods'
import { BXRestNavvyTimemanRecordField } from './record/field'

export class BXRestNavvyTimemanRecord {
  private readonly Navvy = new Navvy()
  public readonly field = new BXRestNavvyTimemanRecordField()

  list(param: iBXRestParamTimemanRecordList) {
    return this.Navvy.simple<
      iBXRestTimemanItemsResult,
      iBXRestTimemanItemsResult,
      iBXRestParamTimemanRecordList
    >([$timeMan, $record, $list], param)
  }
}


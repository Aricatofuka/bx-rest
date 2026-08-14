import { Navvy } from '../../../services/navvy'
import { iBXRestParamTimemanTimeControlReportAdd } from '../../../typification/rest/timeman'
import { $add, $report, $timeMan, $timecontrol } from '../../../consts/part-name-methods'

export class BXRestNavvyTimemanTimeControlReport {
  private readonly Navvy = new Navvy()

  /**
   * Отправляет отчёт о выявленном отсутствии.
   */
  add(param: iBXRestParamTimemanTimeControlReportAdd) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTimemanTimeControlReportAdd
    >([$timeMan, $timecontrol, $report, $add], param)
  }
}


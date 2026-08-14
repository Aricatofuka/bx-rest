import { Navvy } from '../../../services/navvy'
import { iBXRestParamTimemanTimeControlReportsGet, iBXRestTimemanObject } from '../../../typification/rest/timeman'
import { $get, $reports, $timeMan, $timecontrol } from '../../../consts/part-name-methods'
import { BXRestNavvyTimemanTimeControlReportsSettings } from './reports/settings'
import { BXRestNavvyTimemanTimeControlReportsUsers } from './reports/users'

export class BXRestNavvyTimemanTimeControlReports {
  private readonly Navvy = new Navvy()
  /**
   * Настройки интерфейса отчётов контроля времени (`timeman.timecontrol.reports.settings.*`).
   */
  public readonly settings = new BXRestNavvyTimemanTimeControlReportsSettings()
  /**
   * Список пользователей подразделения для отчётов контроля времени (`timeman.timecontrol.reports.users.*`).
   */
  public readonly users = new BXRestNavvyTimemanTimeControlReportsUsers()

  /**
   * Возвращает отчёт о выявленных отсутствиях.
   */
  get(param: iBXRestParamTimemanTimeControlReportsGet) {
    return this.Navvy.simple<
      iBXRestTimemanObject,
      iBXRestTimemanObject,
      iBXRestParamTimemanTimeControlReportsGet
    >([$timeMan, $timecontrol, $reports, $get], param)
  }
}


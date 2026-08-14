import { BXRestNavvyTimemanTimeControlReport } from './timecontrol/report'
import { BXRestNavvyTimemanTimeControlReports } from './timecontrol/reports'
import { BXRestNavvyTimemanTimeControlSettings } from './timecontrol/settings'

export class BXRestNavvyTimemanTimeControl {
  /**
   * Отчёты о выявленном отсутствии (`timeman.timecontrol.report.*`).
   */
  public readonly report = new BXRestNavvyTimemanTimeControlReport()
  /**
   * Отчёты контроля рабочего времени (`timeman.timecontrol.reports.*`).
   */
  public readonly reports = new BXRestNavvyTimemanTimeControlReports()
  /**
   * Настройки инструмента контроля времени (`timeman.timecontrol.settings.*`).
   */
  public readonly settings = new BXRestNavvyTimemanTimeControlSettings()
}


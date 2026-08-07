import { BXRestNavvyTimemanTimeControlReport } from './timecontrol/report'
import { BXRestNavvyTimemanTimeControlReports } from './timecontrol/reports'
import { BXRestNavvyTimemanTimeControlSettings } from './timecontrol/settings'

export class BXRestNavvyTimemanTimeControl {
  public readonly report = new BXRestNavvyTimemanTimeControlReport()
  public readonly reports = new BXRestNavvyTimemanTimeControlReports()
  public readonly settings = new BXRestNavvyTimemanTimeControlSettings()
}


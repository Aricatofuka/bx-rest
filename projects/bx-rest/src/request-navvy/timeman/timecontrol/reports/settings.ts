import { Navvy } from '../../../../services/navvy'
import { iBXRestTimemanTimeControlSettings } from '../../../../typification/rest/timeman'
import { $get, $reports, $settings, $timeMan, $timecontrol } from '../../../../consts/part-name-methods'

export class BXRestNavvyTimemanTimeControlReportsSettings {
  private readonly Navvy = new Navvy()

  get() {
    return this.Navvy.simple<iBXRestTimemanTimeControlSettings>(
      [$timeMan, $timecontrol, $reports, $settings, $get]
    )
  }
}


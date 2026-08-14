import { Navvy } from '../../../services/navvy'
import { iBXRestParamTimemanTimeControlSettingsSet, iBXRestTimemanTimeControlSettings } from '../../../typification/rest/timeman'
import { $get, $set, $settings, $timeMan, $timecontrol } from '../../../consts/part-name-methods'

export class BXRestNavvyTimemanTimeControlSettings {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает настройки инструмента контроля времени.
   */
  get() {
    return this.Navvy.simple<iBXRestTimemanTimeControlSettings>(
      [$timeMan, $timecontrol, $settings, $get]
    )
  }

  /**
   * Устанавливает настройки инструмента контроля времени.
   */
  set(param: iBXRestParamTimemanTimeControlSettingsSet) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTimemanTimeControlSettingsSet
    >([$timeMan, $timecontrol, $settings, $set], param)
  }
}


import { $calendar, $get, $settings } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestCalendarSettings } from '../../typification/rest/calendar'

/** Main calendar settings (`calendar.settings.*`). */
export class BXRestNavvyCalendarSettings {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$calendar, $settings, $get]
  }

  /**
   * Возвращает основные настройки календаря.
   */
  get() {
    return this.Navvy.simple<iBXRestCalendarSettings>(this.url.get)
  }
}

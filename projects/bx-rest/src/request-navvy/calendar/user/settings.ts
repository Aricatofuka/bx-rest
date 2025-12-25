import { Navvy } from '../../../services/navvy'
import { $calendar, $get, $set, $settings, $user } from '../../../consts/part-name-methods'
import { BXRestMapCalendarUserSettings } from '../../../map/calendar/user/settings'
import { iBXRestCalendarUserSettingsSetParam } from '../../../typification/rest/calendar'

export class BXRestNavvyRestCalendarUserSettings {

  private readonly Navvy = new Navvy()

  private url = {
    /** получает пользовательские настройки календаря */
    get: [$calendar, $user, $settings, $get],
    /** устанавливает пользовательские настройки календаря для текущего пользователя */
    set: [$calendar, $user, $settings, $set],
  }

  /** Получает пользовательские настройки календаря */
  get(){
    return this.Navvy.simple(
      this.url.get,
      undefined,
      BXRestMapCalendarUserSettings.get
    )
  }

  /**
   * Устанавливает пользовательские настройки календаря для текущего пользователя
   *
   * @deprecated Не протестирован
   */
  set(param: iBXRestCalendarUserSettingsSetParam) {
    return this.Navvy.simple(this.url.set, param)
  }
}
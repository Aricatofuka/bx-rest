import { BXRestNavvyRestCalendarUserSettings } from './user/settings'

export class BXRestNavvyRestCalendarUser {
  /**
   * Пользовательские настройки календаря (`calendar.user.settings.*`).
   */
  public readonly settings = new BXRestNavvyRestCalendarUserSettings()
}
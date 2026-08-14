import { BXRestNavvyRestCalendarEvent } from './calendar/event'
import { BXRestNavvyRestCalendarSection } from './calendar/section'
import { BXRestNavvyRestCalendarUser } from './calendar/user'
import { BXRestNavvyCalendarAccessibility } from './calendar/accessibility'
import { BXRestNavvyCalendarMeeting } from './calendar/meeting'
import { BXRestNavvyCalendarResource } from './calendar/resource'
import { BXRestNavvyCalendarSettings } from './calendar/settings'

export class BXRestNavvyCalendar {
  /**
   * События календаря (`calendar.event.*`).
   */
  public readonly event = new BXRestNavvyRestCalendarEvent()
  /**
   * Календари (`calendar.section.*`).
   */
  public readonly section = new BXRestNavvyRestCalendarSection()
  /**
   * Пользователи календаря (`calendar.user.*`).
   */
  public readonly user = new BXRestNavvyRestCalendarUser()
  /**
   * Занятость пользователей (`calendar.accessibility.*`).
   */
  public readonly accessibility = new BXRestNavvyCalendarAccessibility()
  /**
   * Встречи календаря (`calendar.meeting.*`).
   */
  public readonly meeting = new BXRestNavvyCalendarMeeting()
  /**
   * Ресурсы для бронирования (`calendar.resource.*`).
   */
  public readonly resource = new BXRestNavvyCalendarResource()
  /**
   * Настройки календаря (`calendar.settings.*`).
   */
  public readonly settings = new BXRestNavvyCalendarSettings()

}

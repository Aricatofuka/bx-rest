import { BXRestMapCalendarEvent } from './calendar/event'
import { BXRestMapCalendarSection } from './calendar/section'
import { BXRestMapCalendarUser } from './calendar/user'

export class BXRestMapCalendar {
  public readonly event = new BXRestMapCalendarEvent()
  public readonly section = new BXRestMapCalendarSection()
  public readonly user = new BXRestMapCalendarUser()
}

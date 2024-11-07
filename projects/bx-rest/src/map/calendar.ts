import { BXRestMapCalendarEvent } from './calendar/event'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapCalendar {
  public readonly event = inject(BXRestMapCalendarEvent)
}

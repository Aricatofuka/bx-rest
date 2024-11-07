import { inject, Injectable } from '@angular/core'
import { BXRestCalendarEvent } from './calendar/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestCalendar {
  public readonly event = inject(BXRestCalendarEvent)
}

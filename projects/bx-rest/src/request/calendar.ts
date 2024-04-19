import { Injectable } from '@angular/core'
import { BXRestCalendarEvent } from './calendar/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestCalendar {

  constructor(
    public event: BXRestCalendarEvent,
  ) {
  }

}

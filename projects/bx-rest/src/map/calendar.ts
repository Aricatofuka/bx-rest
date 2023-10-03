import { BXRestMapCalendarEvent } from './calendar/event'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapCalendar {
  constructor(public event: BXRestMapCalendarEvent) {
  }
}

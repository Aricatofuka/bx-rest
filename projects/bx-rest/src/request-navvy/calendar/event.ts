import { Injectable } from '@angular/core'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { BXRestCalendarEvent } from '../../request/calendar/event'
import { Navvy } from '../../services/navvy'
import { map } from 'rxjs/operators'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'
import { NavvyParam } from '../../services/Navvy/NavvyParam'

@Injectable({
  providedIn: 'root'
})
export class BXRestRestCalendarEvent {

  constructor(
    private BXRestCalendarEvent: BXRestCalendarEvent,
    private eventMap: BXRestMapCalendarEvent
  ) {
  }

  get(param: iBXRestCalendarEventGetParam) {
    return new NavvyParam(this.BXRestCalendarEvent.get, param, 'Не удалось получить календарь', this.eventMap.get)
  }
}

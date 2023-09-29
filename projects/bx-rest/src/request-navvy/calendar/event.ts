import { Injectable } from '@angular/core'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { BXRestCalendarEvent } from '../../request/calendar/event'
import { Navvy } from '../../services/navvy'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestRestCalendarEvent {
  private Navvy: Navvy<BXRestMapCalendarEvent, undefined>

  constructor(
    private BXRestCalendarEvent: BXRestCalendarEvent,
    private eventMap: BXRestMapCalendarEvent,
  ) {
    this.Navvy = new Navvy(this.eventMap, undefined)
  }

  get(param: iBXRestCalendarEventGetParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestCalendarEvent.get,
      param,
      'Не удалось получить календарь',
      this.eventMap.get
    )
  }
}

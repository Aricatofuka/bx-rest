import { Injectable } from '@angular/core'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { BXRestCalendarEvent } from '../../request/calendar/event'
import { Navvy } from '../../services/navvy'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyRestCalendarEvent {
  private Navvy: Navvy<BXRestCalendarEvent, BXRestMapCalendarEvent>

  constructor(
    private BXRestCalendarEvent: BXRestCalendarEvent,
    private eventMap: BXRestMapCalendarEvent,
  ) {
    this.Navvy = new Navvy(BXRestCalendarEvent, eventMap)
  }

  get(param: iBXRestCalendarEventGetParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestCalendarEvent.get,
      param,
      this.eventMap.get
    )
  }
}

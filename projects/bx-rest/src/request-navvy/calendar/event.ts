import { inject, Injectable } from '@angular/core'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { BXRestCalendarEvent } from '../../request/calendar/event'
import { Navvy } from '../../services/navvy'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyRestCalendarEvent {
  private readonly BXRestCalendarEvent = inject(BXRestCalendarEvent)
  private readonly eventMap = inject(BXRestMapCalendarEvent)
  private readonly Navvy = new Navvy(this.BXRestCalendarEvent, this.eventMap)

  get(param: iBXRestCalendarEventGetParam) {
    return this.Navvy.simpleWithArg(
      this.BXRestCalendarEvent.get,
      param,
      this.eventMap.get
    )
  }
}

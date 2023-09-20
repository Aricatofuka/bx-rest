import { Injectable } from '@angular/core'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { BXRestCalendarEvent } from '../../request/calendar/event'
import { Navvy } from '../../services/navvy'
import { map } from 'rxjs/operators'
import { BXRestMapCalendarEvent } from '../../map/calendar/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestRestCalendarEvent {

  constructor(
    private BXRestCalendarEvent: BXRestCalendarEvent,
    private Navvy: Navvy,
    private eventMap: BXRestMapCalendarEvent
  ) {
  }

  get(param: iBXRestCalendarEventGetParam) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestCalendarEvent.get(param),
      'Не удалось получить информацию о событии из календаря'
    ).pipe(
      map(v => this.eventMap.get(v))
    )
  }
}

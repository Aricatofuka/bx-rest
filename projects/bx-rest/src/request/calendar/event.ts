import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { iBXRestCalendarEventGetAnswerHttp } from '../../typification/rest/calendar/get/answer'
import { inject, Injectable } from '@angular/core'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestCalendarEvent {

  protected url = methods.calendar.event

  private readonly http = inject(HttpBXServices)

  get(param: iBXRestCalendarEventGetParam) {
    return this.http.post<iBXRestCalendarEventGetAnswerHttp[]>(this.url.get, param)
  }
}

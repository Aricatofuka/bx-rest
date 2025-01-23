import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { iBXRestCalendarEventGetAnswerHttp } from '../../typification/rest/calendar/get/answer'
import { methods } from '../../typification/base/methods'

export class BXRestCalendarEvent {
  protected url = methods.calendar.event

  private readonly http = new HttpBXServices()

  get(param: iBXRestCalendarEventGetParam) {
    return this.http.post<iBXRestCalendarEventGetAnswerHttp[]>(this.url.get, param)
  }
}

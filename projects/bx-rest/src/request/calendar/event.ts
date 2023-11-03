import { HttpBXServices } from '../../services/http/HttpBX'
import { $add, $calendar, $delete, $event, $get, $nearest, $update } from '../../consts/part-name-methods'
import { iBXRestCalendarEventGetParam } from '../../typification/rest/calendar/get/param'
import { iBXRestCalendarEventGetAnswerHttp } from '../../typification/rest/calendar/get/answer'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestCalendarEvent {

  protected url = {
    add: [$calendar, $event, $add], //	Добавляет новое событие
    delete: [$calendar, $event, $delete], // Удаляет событие
    get: [$calendar, $event, $get], // Возвращает список событий календаря
    getNearest: [$calendar, $event, $get, $nearest], // Возвращает список будущих событий для текущего пользователя
    update: [$calendar, $event, $get, $update], // Редактирует существующее событие
  }

  constructor(
    private http: HttpBXServices
  ) {
  }

  get(param: iBXRestCalendarEventGetParam) {
    return this.http.post<iBXRestCalendarEventGetAnswerHttp[]>(this.url.get, param)
  }
}

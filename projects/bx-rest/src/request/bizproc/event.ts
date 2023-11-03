import { Injectable } from '@angular/core'
import { $bizproc, $event, $send } from '../../consts/part-name-methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocEvent {
  protected url = {
    send: [$bizproc, $event, $send], // Возвращает действию выходные параметры, заданные в описании действия
  }
}

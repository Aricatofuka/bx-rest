import { Injectable } from '@angular/core'
import { $bizproc, $event, $send } from '../../consts/part-name-metods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizprocEvent {
  url = {
    send: [$bizproc, $event, $send], // Возвращает действию выходные параметры, заданные в описании действия
  }
}

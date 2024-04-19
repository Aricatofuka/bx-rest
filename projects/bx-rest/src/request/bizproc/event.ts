import { Injectable } from '@angular/core'
import { methods } from '../../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcEvent {
  protected url = methods.bizProc.event
}

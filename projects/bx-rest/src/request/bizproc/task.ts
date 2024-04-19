import { Injectable } from '@angular/core'
import { $bizproc, $task, $complete, $list } from '../../consts/part-name-methods'
import { methods } from '../../methods';

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcTask {
  protected url = methods.bizProc.task
}

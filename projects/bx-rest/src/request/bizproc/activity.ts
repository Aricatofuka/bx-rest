import { Injectable } from '@angular/core'
import { $bizproc, $add, $activity, $delete, $list, $update, $log } from '../../consts/part-name-methods'
import { methods } from '../../methods';

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcActivity {
  protected url = methods.bizProc.activity
}

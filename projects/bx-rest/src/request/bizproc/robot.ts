import { Injectable } from '@angular/core'
import { $bizproc, $delete, $update, $list, $robot, $add } from '../../consts/part-name-methods'
import { methods } from '../../methods';

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcRobot {
  protected url = methods.bizProc.robot
}

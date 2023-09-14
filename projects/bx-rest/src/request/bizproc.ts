import { Injectable } from '@angular/core'
import { BXRestBizprocWorkflow } from './bizproc/workflow'
import { BXRestBizprocActivity } from './bizproc/activity'
import { BXRestBizprocTask } from './bizproc/task'
import { BXRestBizprocRobot } from './bizproc/robot'
import { BXRestBizprocEvent } from './bizproc/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizproc {

  constructor(
    public workflow: BXRestBizprocWorkflow,
    public activity: BXRestBizprocActivity,
    public task: BXRestBizprocTask,
    public robot: BXRestBizprocRobot,
    public event: BXRestBizprocEvent,
  ) {
  }

}

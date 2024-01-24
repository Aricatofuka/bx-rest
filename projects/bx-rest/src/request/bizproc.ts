import { Injectable } from '@angular/core'
import { BXRestBizProcWorkflow } from './bizproc/workflow'
import { BXRestBizProcActivity } from './bizproc/activity'
import { BXRestBizProcTask } from './bizproc/task'
import { BXRestBizProcRobot } from './bizproc/robot'
import { BXRestBizProcEvent } from './bizproc/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProc {

  constructor(
    public workflow: BXRestBizProcWorkflow,
    public activity: BXRestBizProcActivity,
    public task: BXRestBizProcTask,
    public robot: BXRestBizProcRobot,
    public event: BXRestBizProcEvent,
  ) {
  }

}

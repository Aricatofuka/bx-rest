import { inject, Injectable } from '@angular/core'
import { BXRestBizProcWorkflow } from './bizproc/workflow'
import { BXRestBizProcActivity } from './bizproc/activity'
import { BXRestBizProcTask } from './bizproc/task'
import { BXRestBizProcRobot } from './bizproc/robot'
import { BXRestBizProcEvent } from './bizproc/event'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProc {
  public readonly workflow = inject(BXRestBizProcWorkflow)
  public readonly activity = inject(BXRestBizProcActivity)
  public readonly task = inject(BXRestBizProcTask)
  public readonly robot = inject(BXRestBizProcRobot)
  public readonly event = inject(BXRestBizProcEvent)
}

import { BXRestBizProcWorkflow } from './bizproc/workflow'
import { BXRestBizProcActivity } from './bizproc/activity'
import { BXRestBizProcTask } from './bizproc/task'
import { BXRestBizProcRobot } from './bizproc/robot'
import { BXRestBizProcEvent } from './bizproc/event'

export class BXRestBizProc {
  public readonly workflow = new BXRestBizProcWorkflow()
  public readonly activity = new BXRestBizProcActivity()
  public readonly task = new BXRestBizProcTask()
  public readonly robot = new BXRestBizProcRobot()
  public readonly event = new BXRestBizProcEvent()
}

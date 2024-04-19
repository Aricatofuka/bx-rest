import { Injectable } from '@angular/core'
import { methods } from '../../../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcWorkflowInstance {

  protected url = methods.bizProc.workflow.instances

}

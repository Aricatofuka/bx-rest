import { Injectable } from '@angular/core'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'
import { BXRestBizProcWorkflow } from '../../request/bizproc/workflow'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyBXRestBizProcWorkflow {
  private Navvy: Navvy<BXRestBizProcWorkflow, undefined>

  constructor(
    private BXRestBizProcWorkflow: BXRestBizProcWorkflow,
  ) {
    this.Navvy = new Navvy(this.BXRestBizProcWorkflow, undefined)
  }

  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.Navvy.simpleWithArg(
      this.BXRestBizProcWorkflow.start, param
    )
  }

}

import { Injectable } from '@angular/core'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'
import { BXRestBizprocWorkflow } from '../../request/bizproc/workflow'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyBizprocWorkflow {
  private Navvy: Navvy<BXRestBizprocWorkflow, undefined>

  constructor(
    private BXRestBizprocWorkflow: BXRestBizprocWorkflow,
  ) {
    this.Navvy = new Navvy(this.BXRestBizprocWorkflow, undefined)
  }

  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.Navvy.simpleWithArg(
      this.BXRestBizprocWorkflow.start, param,
      'Не удалось запустить бизнес процесс'
    )
  }

}

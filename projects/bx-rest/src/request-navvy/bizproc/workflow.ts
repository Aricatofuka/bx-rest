import { inject, Injectable } from '@angular/core'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'
import { BXRestBizProcWorkflow } from '../../request/bizproc/workflow'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyBXRestBizProcWorkflow {
  private readonly BXRestBizProcWorkflow = inject(BXRestBizProcWorkflow)
  private readonly Navvy = new Navvy(this.BXRestBizProcWorkflow, undefined)

  /**
   * Запускает Бизнес-процесс
   */
  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.Navvy.simpleWithArg(
      this.BXRestBizProcWorkflow.start, param
    )
  }

}

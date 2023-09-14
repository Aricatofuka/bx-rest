import { Injectable } from '@angular/core'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'
import { BXRestBizprocWorkflow } from '../../request/bizproc/workflow'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyBizprocWorkflow {

  constructor(
    private BXRestBizprocWorkflow: BXRestBizprocWorkflow,
    private Navvy: Navvy,
  ) {
  }

  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestBizprocWorkflow.start(param),
      'Не удалось запустить бизнес процесс'
    )
  }

}

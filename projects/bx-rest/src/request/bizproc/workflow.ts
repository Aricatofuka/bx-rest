import { inject, Injectable } from '@angular/core'
import { BXRestBizProcWorkflowInstance } from './workflow/instance'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'
import { BXRestBizProcWorkflowTemplate } from './workflow/template'
import { HttpNavvyServices } from '../../services/http/httpNavvy'
import { $bizproc, $start, $workflow } from '../../consts/part-name-methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestBizProcWorkflow {

  public readonly instances = inject(BXRestBizProcWorkflowInstance)
  public readonly template = inject(BXRestBizProcWorkflowTemplate)

  public readonly http = inject(HttpNavvyServices)

  /**
   * Запускает Бизнес-процесс
   */
  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.http.post([$bizproc, $workflow, $start], param)
  }

}

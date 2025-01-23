import { BXRestBizProcWorkflowInstance } from './workflow/instance'
import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc/workflow/start'
import { BXRestBizProcWorkflowTemplate } from './workflow/template'
import { HttpNavvyServices } from '../../services/http/httpNavvy'
import { $bizproc, $start, $workflow } from '../../consts/part-name-methods'

export class BXRestBizProcWorkflow {
  public readonly instances = new BXRestBizProcWorkflowInstance()
  public readonly template = new BXRestBizProcWorkflowTemplate()

  public readonly http = new HttpNavvyServices()

  /**
   * Запускает Бизнес-процесс
   */
  start(param: iBXRestParamBizprocWorkflowStart)  {
    return this.http.post([$bizproc, $workflow, $start], param)
  }

}

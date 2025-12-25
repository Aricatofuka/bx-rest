import { iBXRestParamBizprocWorkflowStart } from '../../typification/rest/bizproc'
import { Navvy } from '../../services/navvy'
import { $bizproc, $start, $workflow } from '../../consts/part-name-methods'

export class BXRestNavvyBXRestBizProcWorkflow {
  private readonly Navvy = new Navvy()

  /**
   * Запускает Бизнес-процесс
   */
  start(param: iBXRestParamBizprocWorkflowStart) {
    return this.Navvy.simple([$bizproc, $workflow, $start], param
    )
  }

}

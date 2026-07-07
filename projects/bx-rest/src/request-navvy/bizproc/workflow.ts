import {
  iBXRestBizprocWorkflowInstance,
  iBXRestParamBizprocWorkflowInstances,
  iBXRestParamBizprocWorkflowKill,
  iBXRestParamBizprocWorkflowStart,
  iBXRestParamBizprocWorkflowTerminate
} from '../../typification/rest/bizproc'
import { Navvy } from '../../services/navvy'
import {
  $bizproc,
  $instances,
  $kill,
  $start,
  $terminate,
  $workflow
} from '../../consts/part-name-methods'

export class BXRestNavvyBXRestBizProcWorkflow {
  private readonly Navvy = new Navvy()

  /**
   * Запускает Бизнес-процесс
   */
  start(param: iBXRestParamBizprocWorkflowStart) {
    return this.Navvy.simple<string, string, iBXRestParamBizprocWorkflowStart>(
      [$bizproc, $workflow, $start],
      param
    )
  }

  /**
   * Возвращает список запущенных бизнес-процессов
   */
  instances(param: iBXRestParamBizprocWorkflowInstances = {}) {
    return this.Navvy.pagNav<
      iBXRestBizprocWorkflowInstance,
      iBXRestBizprocWorkflowInstance,
      iBXRestParamBizprocWorkflowInstances
    >([$bizproc, $workflow, $instances], param)
  }

  /**
   * Останавливает активный бизнес-процесс с сохранением его данных
   */
  terminate(param: iBXRestParamBizprocWorkflowTerminate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocWorkflowTerminate>(
      [$bizproc, $workflow, $terminate],
      param
    )
  }

  /**
   * Удаляет запущенный бизнес-процесс вместе со всеми его данными
   */
  kill(param: iBXRestParamBizprocWorkflowKill) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocWorkflowKill>(
      [$bizproc, $workflow, $kill],
      param
    )
  }
}

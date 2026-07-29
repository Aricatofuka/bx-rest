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
import { BXRestNavvyBizProcWorkflowTemplate } from './workflow/template'

/** Запущенные бизнес-процессы (`bizproc.workflow.*`). */
export class BXRestNavvyBXRestBizProcWorkflow {
  private readonly Navvy = new Navvy()

  /** Операции с шаблонами бизнес-процессов. */
  public readonly template = new BXRestNavvyBizProcWorkflowTemplate()

  readonly url = {
    /** Запускает бизнес-процесс. */
    start: [$bizproc, $workflow, $start],
    /** Возвращает запущенные бизнес-процессы. */
    instances: [$bizproc, $workflow, $instances],
    /** Останавливает процесс с сохранением данных. */
    terminate: [$bizproc, $workflow, $terminate],
    /** Удаляет процесс вместе с его данными. */
    kill: [$bizproc, $workflow, $kill]
  }

  /**
   * Запускает новый бизнес-процесс по шаблону для указанного документа.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-workflow-start.html
   */
  start(param: iBXRestParamBizprocWorkflowStart) {
    return this.Navvy.simple<string, string, iBXRestParamBizprocWorkflowStart>(
      this.url.start,
      param
    )
  }

  /**
   * Возвращает список запущенных бизнес-процессов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-workflow-instances.html
   */
  instances(param: iBXRestParamBizprocWorkflowInstances = {}) {
    return this.Navvy.pagNav<
      iBXRestBizprocWorkflowInstance,
      iBXRestBizprocWorkflowInstance,
      iBXRestParamBizprocWorkflowInstances
    >(this.url.instances, param)
  }

  /**
   * Прерывает активный бизнес-процесс с сохранением его данных.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-workflow-terminate.html
   */
  terminate(param: iBXRestParamBizprocWorkflowTerminate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocWorkflowTerminate>(
      this.url.terminate,
      param
    )
  }

  /**
   * Удаляет запущенный бизнес-процесс вместе со всеми его данными.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-workflow-kill.html
   */
  kill(param: iBXRestParamBizprocWorkflowKill) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocWorkflowKill>(
      this.url.kill,
      param
    )
  }
}

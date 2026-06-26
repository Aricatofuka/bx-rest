import {
  iBXRestBizprocTask,
  iBXRestParamBizprocTaskComplete,
  iBXRestParamBizprocTaskDelegate,
  iBXRestParamBizprocTaskList
} from '../../typification/rest/bizproc'
import { Navvy } from '../../services/navvy'
import {
  $bizproc,
  $complete,
  $delegate,
  $list,
  $task
} from '../../consts/part-name-methods'

export class BXRestNavvyBizProcTask {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список заданий бизнес-процессов
   */
  list(param: iBXRestParamBizprocTaskList = {}) {
    return this.Navvy.pagNav<
      iBXRestBizprocTask,
      iBXRestBizprocTask,
      iBXRestParamBizprocTaskList
    >([$bizproc, $task, $list], param)
  }

  /**
   * Выполняет задание бизнес-процесса
   */
  complete(param: iBXRestParamBizprocTaskComplete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocTaskComplete>(
      [$bizproc, $task, $complete],
      param
    )
  }

  /**
   * Делегирует задания бизнес-процесса другому пользователю
   */
  delegate(param: iBXRestParamBizprocTaskDelegate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocTaskDelegate>(
      [$bizproc, $task, $delegate],
      param
    )
  }
}

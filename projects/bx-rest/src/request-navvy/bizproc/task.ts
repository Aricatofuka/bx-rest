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

/** Задания бизнес-процессов (`bizproc.task.*`). */
export class BXRestNavvyBizProcTask {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Возвращает задания бизнес-процессов. */
    list: [$bizproc, $task, $list],
    /** Выполняет задание. */
    complete: [$bizproc, $task, $complete],
    /** Делегирует задания другому пользователю. */
    delegate: [$bizproc, $task, $delegate]
  }

  /**
   * Возвращает список заданий бизнес-процессов.
   *
   * Если `USER_ID` не задан, обычный пользователь получает только свои
   * задания; руководитель и администратор могут запрашивать задания других.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-task/bizproc-task-list.html
   */
  list(param: iBXRestParamBizprocTaskList = {}) {
    return this.Navvy.pagNav<
      iBXRestBizprocTask,
      iBXRestBizprocTask,
      iBXRestParamBizprocTaskList
    >(this.url.list, param)
  }

  /**
   * Выполняет доступное текущему пользователю задание бизнес-процесса.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-task/bizproc-task-complete.html
   */
  complete(param: iBXRestParamBizprocTaskComplete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocTaskComplete>(
      this.url.complete,
      param
    )
  }

  /**
   * Делегирует задания бизнес-процесса другому пользователю.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/bizproc/bizproc-task/bizproc-task-delegate.html
   */
  delegate(param: iBXRestParamBizprocTaskDelegate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamBizprocTaskDelegate>(
      this.url.delegate,
      param
    )
  }
}

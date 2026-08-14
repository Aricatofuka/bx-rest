import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $counters, $get, $task, $tasks } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskCounters  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает счётчики задач пользователя.
   */
  get(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $counters, $get], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $attach, $files, $task, $tasks } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskFiles  {
  private readonly Navvy = new Navvy()

  /**
   * Прикрепляет файлы к задаче.
   */
  attach(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $files, $attach], param)
  }
}


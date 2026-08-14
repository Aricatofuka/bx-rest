import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $access, $get, $task, $tasks } from '../../../consts/part-name-methods'
import { BXRestNavvyTasksTaskAccessField } from './access/field'

export class BXRestNavvyTasksTaskAccess  {
  private readonly Navvy = new Navvy()

  /**
   * Поля прав доступа к задаче (`tasks.task.access.field.*`).
   */
  public readonly field = new BXRestNavvyTasksTaskAccessField()

  /**
   * Проверяет доступ к задаче.
   */
  get(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $access, $get], param)
  }
}


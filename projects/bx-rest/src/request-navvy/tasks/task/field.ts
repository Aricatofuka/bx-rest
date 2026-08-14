import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $field, $get, $list, $task, $tasks } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля задачи.
   */
  get(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $field, $get], param)
  }

  /**
   * Возвращает список полей задачи.
   */
  list(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $field, $list], param)
  }
}


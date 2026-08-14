import { Navvy } from '../../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../../typification/rest/tasks'
import { $access, $field, $get, $list, $task, $tasks } from '../../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskAccessField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля прав доступа к задаче.
   */
  get(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $access, $field, $get], param)
  }

  /**
   * Возвращает список полей прав доступа к задаче.
   */
  list(param: iBXRestTasksParams = {}) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $access, $field, $list], param)
  }
}


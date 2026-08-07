import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $history, $list, $task, $tasks } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskHistory  {
  private readonly Navvy = new Navvy()

  list(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $history, $list], param)
  }
}


import { Navvy } from '../../../services/navvy'
import { iBXRestTasksObject, iBXRestTasksParams } from '../../../typification/rest/tasks'
import { $add, $favorite, $remove, $task, $tasks } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksTaskFavorite  {
  private readonly Navvy = new Navvy()

  add(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $favorite, $add], param)
  }

  remove(param: iBXRestTasksParams) {
    return this.Navvy.simple<iBXRestTasksObject, iBXRestTasksObject, iBXRestTasksParams>([$tasks, $task, $favorite, $remove], param)
  }
}


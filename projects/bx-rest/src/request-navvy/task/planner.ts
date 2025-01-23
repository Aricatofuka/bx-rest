import { BXRestMapTaskPlaner } from '../../map/task/planner'
import { Navvy } from '../../services/navvy'
import { $getlist, $planner, $task } from '../../consts/part-name-methods'

export class BXRestNavvyTaskPlanner {

  url = {
    getList: [$task, $planner, $getlist]
  }

  private readonly Navvy = new Navvy()
  
  getList() {
    return this.Navvy.simple<(string | number)[], (string | number)[], undefined>(
      this.url.getList,
      undefined,
      BXRestMapTaskPlaner.getList
    )
  }
}

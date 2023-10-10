import { Injectable } from '@angular/core'
import { BXRestMapTaskPlaner } from '../../map/task/planner'
import { Navvy } from '../../services/navvy'
import { BXRestTaskPlanner } from '../../request/task/planner'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskPlanner {

  private Navvy: Navvy<BXRestTaskPlanner, BXRestMapTaskPlaner>

  constructor(
    private BXRestTaskPlanner: BXRestTaskPlanner,
    private BXRestMapTaskPlaner: BXRestMapTaskPlaner
  ) {
    this.Navvy = new Navvy(this.BXRestTaskPlanner, this.BXRestMapTaskPlaner)
  }

  getList() {
    return this.Navvy.simple(
      this.BXRestTaskPlanner.getList,
      'Не удалось получить текущий клан на день',
      this.BXRestMapTaskPlaner.getList
    )
  }
}

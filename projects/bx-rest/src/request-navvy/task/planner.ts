import { inject, Injectable } from '@angular/core'
import { BXRestMapTaskPlaner } from '../../map/task/planner'
import { Navvy } from '../../services/navvy'
import { BXRestTaskPlanner } from '../../request/task/planner'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskPlanner {

  private readonly BXRestTaskPlanner = inject(BXRestTaskPlanner)
  private readonly BXRestMapTaskPlaner = inject(BXRestMapTaskPlaner)
  private readonly Navvy = new Navvy(this.BXRestTaskPlanner, this.BXRestMapTaskPlaner)
  
  getList() {
    return this.Navvy.simple(
      this.BXRestTaskPlanner.getList,
      this.BXRestMapTaskPlaner.getList
    )
  }
}

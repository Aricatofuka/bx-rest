import { inject, Injectable } from '@angular/core'
import { BXRestTaskStages } from '../../request/task/stages'
import { iBXRestParamTaskStageGet } from '../../typification/rest/task/stages/get'
import { Navvy } from '../../services/navvy'
import { BXRestMapTaskStage } from '../../map/task/stages'
import { iBXRestParamTaskStagesUpdate } from '../../typification/rest/task/stages/update'
import { iBXRestParamTaskStagesCanMoveTask } from '../../typification/rest/task/stages/canMoveTask'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskStages {

  private readonly BXRestTaskStages = inject(BXRestTaskStages)
  private readonly mapTaskStages = inject(BXRestMapTaskStage)
  private readonly Navvy = new Navvy(this.BXRestTaskStages, this.mapTaskStages)

  get(param: iBXRestParamTaskStageGet) {
    this.Navvy.simpleWithArg(
      this.BXRestTaskStages.get,
      param
    )
  }

  update(param: iBXRestParamTaskStagesUpdate) {
    this.Navvy.simpleWithArg(
      this.BXRestTaskStages.update,
      param
    )
  }

  canMoveTask(param: iBXRestParamTaskStagesCanMoveTask) {
    this.Navvy.simpleWithArg(
      this.BXRestTaskStages.canMoveTask,
      param
    )
  }
}

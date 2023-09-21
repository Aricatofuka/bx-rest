import { Injectable } from '@angular/core'
import { BXRestTaskStages } from '../../request/task/stages'
import { iBXRestParamTaskStageGet } from '../../typification/rest/task/stages/get'
import { Navvy } from '../../services/navvy'
import { map } from 'rxjs/operators'
import { BXRestMapTaskStage } from '../../map/task/stages'
import { iBXRestParamTaskStagesUpdate } from '../../typification/rest/task/stages/update'
import { iBXRestParamTaskStagesCanMoveTask } from '../../typification/rest/task/stages/canMoveTask'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskStages {

  constructor(
    private BXRestTaskStages: BXRestTaskStages,
    private Navvy: Navvy,
    private mapTaskStages: BXRestMapTaskStage
  ) {
  }

  get(param: iBXRestParamTaskStageGet) {
    this.Navvy.mapAndSnackBarError(
      this.BXRestTaskStages.get(param),
      'Не удалось получить стадии задач'
    ).pipe(
      map(v => this.mapTaskStages.get(v))
    )
  }

  update(param: iBXRestParamTaskStagesUpdate) {
    this.Navvy.mapAndSnackBarError(
      this.BXRestTaskStages.update(param),
      'Не удалось обновить стадии задач'
    )
  }

  canMoveTask(param: iBXRestParamTaskStagesCanMoveTask) {
    this.Navvy.mapAndSnackBarError(
      this.BXRestTaskStages.canMoveTask(param),
      'Не удалось получить информацию о правах на сдвиг задачи'
    )
  }
}

import { inject, Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamTaskStageGet } from '../../typification/rest/task/stages/get'
import { iBXRestTaskStage } from '../../typification/rest/task/stages/stage'
import { iBXRestParamTaskStagesUpdate } from '../../typification/rest/task/stages/update'
import { iBXRestParamTaskStagesCanMoveTask } from '../../typification/rest/task/stages/canMoveTask'
import { methods } from '../../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskStages {

  private readonly http = inject(HttpBXServices)

  protected url = methods.task.stages

  get(param: iBXRestParamTaskStageGet) {
    return this.http.post<iBXRestTaskStage[]>(this.url.get, param)
  }

  update(param: iBXRestParamTaskStagesUpdate) {
    return this.http.post(this.url.update, param)
  }

  canMoveTask(param: iBXRestParamTaskStagesCanMoveTask) {
    return this.http.post(this.url.canmovetask, param)
  }
}

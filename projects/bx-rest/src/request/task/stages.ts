import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamTaskStageGet } from '../../typification/rest/task/stages/get'
import { iBXRestTaskStage } from '../../typification/rest/task/stages/stage'
import { iBXRestParamTaskStagesUpdate } from '../../typification/rest/task/stages/update'
import { iBXRestParamTaskStagesCanMoveTask } from '../../typification/rest/task/stages/canMoveTask'
import { $get, $stages, $task, $update } from '../../consts/part-name-methods'

export class BXRestTaskStages {
  private readonly http = new HttpBXServices()
  protected url = {
    get: [$task, $stages, $get],
    update: [$task, $stages, $update],
    canmovetask: [$task, $stages, 'canmovetask'],
  }

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

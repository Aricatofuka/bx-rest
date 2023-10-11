import { Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import { $add, $delete, $get, $stages, $task, $update } from '../../consts/part-name-metods'
import { iBXRestParamTaskStageGet } from '../../typification/rest/task/stages/get'
import { iBXRestTaskStage } from '../../typification/rest/task/stages/stage'
import { iBXRestParamTaskStagesUpdate } from '../../typification/rest/task/stages/update'
import { iBXRestParamTaskStagesCanMoveTask } from '../../typification/rest/task/stages/canMoveTask'

@Injectable({
  providedIn: 'root'
})
export class BXRestTaskStages {

  protected url = {
    add: [$task, $stages, $add], // Метод добавляет стадии Канбана / Моего плана
    canmovetask: [$task, $stages, 'canmovetask'], // Метод определяет, может ли текущий пользователь перемещать задачи в указанной сущности
    delete: [$task, $stages, $delete], // Метод удаляет стадии Канбана / Моего плана
    get: [$task, $stages, $get], // Метод получает стадии Канбана / Моего плана
    movetask: [$task, $stages, 'movetask'], // Метод перемещает задачи из одной стадии в другую
    update: [$task, $stages, $update] // Метод обновляет стадии Канбана / Моего плана.
  }

  constructor(private http: HttpBXServices) {
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

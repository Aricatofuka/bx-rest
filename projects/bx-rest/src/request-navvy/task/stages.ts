import {
  iBXRestParamTaskStageGet,
  iBXRestParamTaskStagesUpdate,
  iBXRestParamTaskStagesCanMoveTask,
  iBXRestTaskStage
} from '../../typification/rest/task'
import { Navvy } from '../../services/navvy'
import { $add, $delete, $get, $stages, $task, $update } from '../../consts/part-name-methods'

export class BXRestNavvyTaskStages {

  url = {
    /**
     * Метод добавляет стадии Канбана / Моего плана
     */
    add: [$task, $stages, $add],
    /**
     * Метод определяет, может ли текущий пользователь перемещать задачи в указанной сущности
     */
    canMoveTask: [$task, $stages, 'canmovetask'],
    /**
     * Метод удаляет стадии Канбана / Моего плана
     */
    delete: [$task, $stages, $delete],
    /**
     * Метод получает стадии Канбана / Моего плана
     */
    get: [$task, $stages, $get],
    /**
     * Метод перемещает задачи из одной стадии в другую
     */
    movetask: [$task, $stages, 'movetask'], //
    /**
     * Метод обновляет стадии Канбана / Моего плана.
     */
    update: [$task, $stages, $update]
  }

  private readonly Navvy = new Navvy()

  get(param: iBXRestParamTaskStageGet) {
    this.Navvy.simple<iBXRestTaskStage[], iBXRestTaskStage[], iBXRestParamTaskStageGet>(
      this.url.get,
      param
    )
  }

  update(param: iBXRestParamTaskStagesUpdate) {
    this.Navvy.simple<boolean, boolean, iBXRestParamTaskStagesUpdate>(
      this.url.update,
      param
    )
  }

  canMoveTask(param: iBXRestParamTaskStagesCanMoveTask) {
    this.Navvy.simple<boolean, boolean, iBXRestParamTaskStagesCanMoveTask>(
      this.url.canMoveTask,
      param
    )
  }
}

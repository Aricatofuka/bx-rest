import {
  iBXRestAddTaskStage,
  iBXRestParamTaskStageGet,
  iBXRestParamTaskStagesUpdate,
  iBXRestParamTaskStagesCanMoveTask,
  iBXRestTaskStage,
  iBXRestParamTaskStagesDelete,
  iBXRestParamTaskStagesMoveTask
} from '../../typification/rest/task'
import { Navvy } from '../../services/navvy'
import { $add, $canmovetask, $delete, $get, $movetask, $stages, $task, $update } from '../../consts/part-name-methods'

export class BXRestNavvyTaskStages {

  url = {
    /**
     * Метод добавляет стадии Канбана / Моего плана
     */
    add: [$task, $stages, $add],
    /**
     * Метод определяет, может ли текущий пользователь перемещать задачи в указанной сущности
     */
    canMoveTask: [$task, $stages, $canmovetask],
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
    movetask: [$task, $stages, $movetask], //
    /**
     * Метод обновляет стадии Канбана / Моего плана.
     */
    update: [$task, $stages, $update]
  }

  private readonly Navvy = new Navvy()

  /**
   * Добавляет стадии канбана или «Моего плана».
   */
  add(param: iBXRestAddTaskStage) {
    return this.Navvy.simple<number, number, iBXRestAddTaskStage>(
      this.url.add,
      param
    )
  }

  /**
   * Возвращает стадии канбана или «Моего плана».
   */
  get(param: iBXRestParamTaskStageGet) {
    return this.Navvy.simple<iBXRestTaskStage[], iBXRestTaskStage[], iBXRestParamTaskStageGet>(
      this.url.get,
      param
    )
  }

  /**
   * Обновляет стадии канбана или «Моего плана».
   */
  update(param: iBXRestParamTaskStagesUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskStagesUpdate>(
      this.url.update,
      param
    )
  }

  /**
   * Определяет, может ли пользователь перемещать задачи между стадиями.
   */
  canMoveTask(param: iBXRestParamTaskStagesCanMoveTask) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskStagesCanMoveTask>(
      this.url.canMoveTask,
      param
    )
  }

  /**
   * Удаляет стадии канбана или «Моего плана».
   */
  delete(param: iBXRestParamTaskStagesDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskStagesDelete>(
      this.url.delete,
      param
    )
  }

  /**
   * Перемещает задачи из одной стадии в другую.
   */
  moveTask(param: iBXRestParamTaskStagesMoveTask) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskStagesMoveTask>(
      this.url.movetask,
      param
    )
  }
}

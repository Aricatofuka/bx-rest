import { Navvy } from '../../../services/navvy'
import { iBXRestParamTasksFlowCreate, iBXRestParamTasksFlowId, iBXRestParamTasksFlowUpdate, iBXRestTasksObject } from '../../../typification/rest/tasks'
import { $Flow, $activate, $create, $delete, $flow, $get, $isExists, $pin, $tasks, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksFlowFlow {
  private readonly Navvy = new Navvy()

  /**
   * Включает или выключает поток.
   */
  activate(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $activate], param
    )
  }

  /**
   * Создаёт поток.
   */
  create(param: iBXRestParamTasksFlowCreate) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksFlowCreate
    >([$tasks, $flow, $Flow, $create], param)
  }

  /**
   * Удаляет поток.
   */
  delete(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $delete], param
    )
  }

  /**
   * Возвращает поток.
   */
  get(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksFlowId
    >([$tasks, $flow, $Flow, $get], param)
  }

  /**
   * Проверяет существование потока по названию.
   */
  isExists(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $isExists], param
    )
  }

  /**
   * Закрепляет поток в списке.
   */
  pin(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $pin], param
    )
  }

  /**
   * Изменяет поток.
   */
  update(param: iBXRestParamTasksFlowUpdate) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksFlowUpdate
    >([$tasks, $flow, $Flow, $update], param)
  }
}


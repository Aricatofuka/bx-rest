import { Navvy } from '../../../services/navvy'
import { iBXRestParamTasksFlowCreate, iBXRestParamTasksFlowId, iBXRestParamTasksFlowUpdate, iBXRestTasksObject } from '../../../typification/rest/tasks'
import { $Flow, $activate, $create, $delete, $flow, $get, $isExists, $pin, $tasks, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyTasksFlowFlow {
  private readonly Navvy = new Navvy()

  activate(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $activate], param
    )
  }

  create(param: iBXRestParamTasksFlowCreate) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksFlowCreate
    >([$tasks, $flow, $Flow, $create], param)
  }

  delete(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $delete], param
    )
  }

  get(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksFlowId
    >([$tasks, $flow, $Flow, $get], param)
  }

  isExists(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $isExists], param
    )
  }

  pin(param: iBXRestParamTasksFlowId) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTasksFlowId>(
      [$tasks, $flow, $Flow, $pin], param
    )
  }

  update(param: iBXRestParamTasksFlowUpdate) {
    return this.Navvy.simple<
      iBXRestTasksObject,
      iBXRestTasksObject,
      iBXRestParamTasksFlowUpdate
    >([$tasks, $flow, $Flow, $update], param)
  }
}


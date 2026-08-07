import { Navvy } from '../../services/navvy'
import {
  iBXRestParamTaskChecklistItem,
  iBXRestParamTaskChecklistItemAction,
  iBXRestParamTaskChecklistItemAdd,
  iBXRestParamTaskChecklistItemMove,
  iBXRestParamTaskChecklistItemUpdate,
  iBXRestTaskObject
} from '../../typification/rest/task'
import { $add, $checklistitem, $complete, $delete, $get, $getlist, $getmanifest, $isactionallowed, $moveafteritem, $renew, $task, $update } from '../../consts/part-name-methods'

export class BXRestNavvyTaskChecklistItem {
  private readonly Navvy = new Navvy()

  add(param: iBXRestParamTaskChecklistItemAdd) {
    return this.Navvy.simple<number, number, iBXRestParamTaskChecklistItemAdd>(
      [$task, $checklistitem, $add],
      param
    )
  }

  complete(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskChecklistItem>(
      [$task, $checklistitem, $complete],
      param
    )
  }

  delete(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskChecklistItem>(
      [$task, $checklistitem, $delete],
      param
    )
  }

  get(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<
      iBXRestTaskObject,
      iBXRestTaskObject,
      iBXRestParamTaskChecklistItem
    >([$task, $checklistitem, $get], param)
  }

  getlist(param: Pick<iBXRestParamTaskChecklistItem, 'TASKID'>) {
    return this.Navvy.simple<
      iBXRestTaskObject[],
      iBXRestTaskObject[],
      Pick<iBXRestParamTaskChecklistItem, 'TASKID'>
    >([$task, $checklistitem, $getlist], param)
  }

  getmanifest() {
    return this.Navvy.simple<iBXRestTaskObject>([$task, $checklistitem, $getmanifest])
  }

  isactionallowed(param: iBXRestParamTaskChecklistItemAction) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTaskChecklistItemAction
    >([$task, $checklistitem, $isactionallowed], param)
  }

  moveafteritem(param: iBXRestParamTaskChecklistItemMove) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTaskChecklistItemMove
    >([$task, $checklistitem, $moveafteritem], param)
  }

  renew(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskChecklistItem>(
      [$task, $checklistitem, $renew],
      param
    )
  }

  update(param: iBXRestParamTaskChecklistItemUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTaskChecklistItemUpdate
    >([$task, $checklistitem, $update], param)
  }
}

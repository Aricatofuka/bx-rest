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

  /**
   * Добавляет элемент чек-листа к задаче.
   */
  add(param: iBXRestParamTaskChecklistItemAdd) {
    return this.Navvy.simple<number, number, iBXRestParamTaskChecklistItemAdd>(
      [$task, $checklistitem, $add],
      param
    )
  }

  /**
   * Отмечает элемент чек-листа как выполненный.
   */
  complete(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskChecklistItem>(
      [$task, $checklistitem, $complete],
      param
    )
  }

  /**
   * Удаляет элемент чек-листа.
   */
  delete(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskChecklistItem>(
      [$task, $checklistitem, $delete],
      param
    )
  }

  /**
   * Возвращает элемент чек-листа по идентификатору.
   */
  get(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<
      iBXRestTaskObject,
      iBXRestTaskObject,
      iBXRestParamTaskChecklistItem
    >([$task, $checklistitem, $get], param)
  }

  /**
   * Возвращает список элементов чек-листа.
   */
  getlist(param: Pick<iBXRestParamTaskChecklistItem, 'TASKID'>) {
    return this.Navvy.simple<
      iBXRestTaskObject[],
      iBXRestTaskObject[],
      Pick<iBXRestParamTaskChecklistItem, 'TASKID'>
    >([$task, $checklistitem, $getlist], param)
  }

  /**
   * Возвращает список методов чек-листа и их описание.
   */
  getmanifest() {
    return this.Navvy.simple<iBXRestTaskObject>([$task, $checklistitem, $getmanifest])
  }

  /**
   * Проверяет, разрешено ли действие с элементом чек-листа.
   */
  isactionallowed(param: iBXRestParamTaskChecklistItemAction) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTaskChecklistItemAction
    >([$task, $checklistitem, $isactionallowed], param)
  }

  /**
   * Помещает элемент чек-листа после указанного.
   */
  moveafteritem(param: iBXRestParamTaskChecklistItemMove) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTaskChecklistItemMove
    >([$task, $checklistitem, $moveafteritem], param)
  }

  /**
   * Отмечает выполненный элемент чек-листа как активный.
   */
  renew(param: iBXRestParamTaskChecklistItem) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskChecklistItem>(
      [$task, $checklistitem, $renew],
      param
    )
  }

  /**
   * Обновляет данные элемента чек-листа.
   */
  update(param: iBXRestParamTaskChecklistItemUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamTaskChecklistItemUpdate
    >([$task, $checklistitem, $update], param)
  }
}

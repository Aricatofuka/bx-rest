import { Navvy } from '../../services/navvy'
import { BXRestMapTaskCommentItem } from '../../map/task/commentitem'
import {
  iBXRestParamTaskCommentItemGet,
  iBXRestTaskCommentItemUpdate,
  iBXRestCommentTaskAdd,
  BXRestTaskCommentItemGetList,
  BXRestTaskCommentItemDelete,
  iBXRestTaskComment,
  iBXRestTaskCommentHtml,
  iBXRestParamTaskItemAction,
  iBXRestTaskObject
} from '../../typification/rest/task'
import { mergeMap, of } from 'rxjs'
import { $add, $commentitem, $delete, $get, $getlist, $getmanifest, $isactionallowed, $task, $update } from '../../consts/part-name-methods'

export class BXRestNavvyTaskCommentItem {
  protected url = {
    getList: [$task, $commentitem, $getlist],
    get: [$task, $commentitem, $get],
    add: [$task, $commentitem, $add],
    update: [$task, $commentitem, $update],
    delete: [$task, $commentitem, $delete],
  }

  private readonly Navvy = new Navvy()

  /**
   * Создаёт новый комментарий к задаче.
   */
  add(param: iBXRestCommentTaskAdd) {
    return this.Navvy.simple<number, number, iBXRestCommentTaskAdd>(
      this.url.add, param
    )
  }

  /**
   * Обновляет данные комментария.
   */
  update(param: iBXRestTaskCommentItemUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestTaskCommentItemUpdate>(
      this.url.update, param
    )
  }

  /**
   * Возвращает комментарий к задаче.
   */
  get(param: iBXRestParamTaskCommentItemGet) {
    return this.Navvy.simple<iBXRestTaskCommentHtml, iBXRestTaskComment, iBXRestParamTaskCommentItemGet>(
      this.url.get, param,
      BXRestMapTaskCommentItem.get
    )
  }

  /**
   * Возвращает список комментариев к задаче.
   */
  getlist(param: BXRestTaskCommentItemGetList = {
    FILTER: {},
    ORDER: {
      POST_DATE: 'asc'
    }
  }) {
    return this.Navvy.simple(
      this.url.getList, param,
      BXRestMapTaskCommentItem.getlist
    )
  }

  /**
   * Удаляет комментарий.
   */
  del(param: BXRestTaskCommentItemDelete) {
    if (param.ITEMID > 0) {
      return this.get(param).res().pipe(
        mergeMap(v => {
          if (v) {
            return this.Navvy.simple<boolean, boolean, BXRestTaskCommentItemDelete>(
              this.url.delete, param
            ).res()
          }
          return of(false)
        })
      )
    } else {
      return of(false)
    }
  }

  /**
   * Возвращает список методов комментариев и их описание.
   */
  getmanifest() {
    return this.Navvy.simple<iBXRestTaskObject>([$task, $commentitem, $getmanifest])
  }

  /**
   * Проверяет, разрешено ли действие с комментарием.
   */
  isactionallowed(param: iBXRestParamTaskItemAction) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTaskItemAction>(
      [$task, $commentitem, $isactionallowed],
      param
    )
  }
}

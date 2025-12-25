import { Navvy } from '../../services/navvy'
import { BXRestMapTaskCommentItem } from '../../map/task/commentitem'
import {
  iBXRestParamTaskCommentItemGet,
  iBXRestTaskCommentItemUpdate,
  iBXRestCommentTaskAdd,
  BXRestTaskCommentItemGetList,
  BXRestTaskCommentItemDelete,
  iBXRestTaskComment,
  iBXRestTaskCommentHtml
} from '../../typification/rest/task'
import { mergeMap, of } from 'rxjs'
import { methods } from '../../typification/base/methods'

export class BXRestNavvyTaskCommentItem {
  protected url = methods.task.commentItem

  private readonly Navvy = new Navvy()

  add(param: iBXRestCommentTaskAdd) {
    return this.Navvy.simple<number, number, iBXRestCommentTaskAdd>(
      this.url.add, param
    )
  }

  update(param: iBXRestTaskCommentItemUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestTaskCommentItemUpdate>(
      this.url.update, param
    )
  }

  get(param: iBXRestParamTaskCommentItemGet) {
    return this.Navvy.simple<iBXRestTaskCommentHtml, iBXRestTaskComment, iBXRestParamTaskCommentItemGet>(
      this.url.get, param,
      BXRestMapTaskCommentItem.get
    )
  }

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
}

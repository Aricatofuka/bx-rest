import { inject, Injectable } from '@angular/core'
import { BXRestTaskCommentItem } from '../../request/task/commentitem'
import { Navvy } from '../../services/navvy'
import { BXRestMapTaskCommentItem } from '../../map/task/commentitem'
import { iBXRestParamTaskCommentItemGet } from '../../typification/rest/task/commentitem/get'
import { iBXRestTaskCommentItemUpdate } from '../../typification/rest/task/commentitem/update'
import { iBXRestCommentTaskAdd } from '../../typification/rest/task/commentitem/add'
import {
  BXRestTaskCommentItemGetList,
} from '../../typification/rest/task/commentitem/getlist'
import { BXRestTaskCommentItemDelete } from '../../typification/rest/task/commentitem/delete'
import { mergeMap, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskCommentItem {

  private readonly BXRestTaskCommentItem = inject(BXRestTaskCommentItem)
  private readonly mapTaskCommentItem = inject(BXRestMapTaskCommentItem)
  private readonly Navvy = new Navvy(this.BXRestTaskCommentItem, this.mapTaskCommentItem)

  add(param: iBXRestCommentTaskAdd) {
    return this.Navvy.simpleWithArg(
      this.BXRestTaskCommentItem.add, param
    )
  }

  update(param: iBXRestTaskCommentItemUpdate) {
    return this.Navvy.simpleWithArg(
      this.BXRestTaskCommentItem.update, param
    )
  }

  get(param: iBXRestParamTaskCommentItemGet) {
    return this.Navvy.simpleWithArg(
      this.BXRestTaskCommentItem.get, param,
      this.mapTaskCommentItem.get
    )
  }

  getlist(param: BXRestTaskCommentItemGetList = {
    FILTER: {},
    ORDER: {
      POST_DATE: 'asc'
    }
  }) {
    return this.Navvy.simpleWithArg(
      this.BXRestTaskCommentItem.getlist, param,
      this.mapTaskCommentItem.getlist
    )
  }

  del(param: BXRestTaskCommentItemDelete) {
    if (param.ITEMID > 0) {
      return this.get(param).result().pipe(
        mergeMap(v => {
          if(v) {
            return this.Navvy.simpleWithArg(
              this.BXRestTaskCommentItem.del, param,
            ).result()
          }
          return of(false)
        })
      )
    } else {
      return of(false)
    }
  }
}

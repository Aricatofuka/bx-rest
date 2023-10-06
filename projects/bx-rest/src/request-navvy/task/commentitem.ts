import { Injectable } from '@angular/core'
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
import SnackBarService from '../../services/snack-bar/snack-bar.service'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskCommentItem {

  protected Navvy: Navvy<BXRestTaskCommentItem, BXRestMapTaskCommentItem>

  constructor(
    private BXRestTaskCommentItem: BXRestTaskCommentItem,
    private mapTaskCommentItem: BXRestMapTaskCommentItem,
    private snackBar: SnackBarService,
  ) {
    this.Navvy = new Navvy(this.BXRestTaskCommentItem, this.mapTaskCommentItem)
  }

  add(param: iBXRestCommentTaskAdd) {
    return this.Navvy.simpleWithArg(
      this.BXRestTaskCommentItem.add, param,
      'Не удалось добавить комментарий к задаче'
    )
  }

  update(param: iBXRestTaskCommentItemUpdate) {
    return this.Navvy.simpleWithArg(
      this.BXRestTaskCommentItem.update, param,
      'Не удалось обновить комментарий к задаче'
    )
  }

  get(param: iBXRestParamTaskCommentItemGet) {
    return this.Navvy.simpleWithArg(
      this.BXRestTaskCommentItem.get, param,
      'Не удалось получить комментарий к задаче',
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
      'Не удалось получить комментарии к задаче',
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
              'Не удалось удалить комментарий'
            ).result()
          }
          this.snackBar.warning('comment not exist')
          return of(false)
        })
      )
    } else {
      this.snackBar.warning('comment not exist')
      return of(false)
    }
  }
}

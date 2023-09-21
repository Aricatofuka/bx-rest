import { Injectable } from '@angular/core'
import { BXRestTaskCommentItem } from '../../request/task/commentitem'
import { Navvy } from '../../services/navvy'
import { map } from 'rxjs/operators'
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

  constructor(
    private BXRestTaskCommentItem: BXRestTaskCommentItem,
    private Navvy: Navvy,
    private mapTaskCommentItem: BXRestMapTaskCommentItem,
    private snackBar: SnackBarService,
  ) {
  }

  add(param: iBXRestCommentTaskAdd) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestTaskCommentItem.add(param),
      'Не удалось добавить комментарий к задаче'
    )
  }

  update(param: iBXRestTaskCommentItemUpdate) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestTaskCommentItem.update(param),
      'Не удалось обновить комментарий к задаче'
    )
  }

  get(param: iBXRestParamTaskCommentItemGet) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestTaskCommentItem.get(param),
      'Не удалось получить комментарий к задаче'
    ).pipe(
      map(v => this.mapTaskCommentItem.get(v))
    )
  }

  getlist(param: BXRestTaskCommentItemGetList = {
    FILTER: {},
    ORDER: {
      POST_DATE: 'asc'
    }
  }) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestTaskCommentItem.getlist(param),
      'Не удалось получить комментарии к задаче'
    ).pipe(
      map(v => this.mapTaskCommentItem.getlist(v))
    )
  }

  del(param: BXRestTaskCommentItemDelete) {
    if (param.ITEMID > 0) {
      return this.get(param).pipe(
        mergeMap(_ => {
          return this.Navvy.mapAndSnackBarError(
            this.BXRestTaskCommentItem.del(param),
            'Не удалось удалить комментарий'
          )
        })
      )
    } else {
      this.snackBar.warning('comment not exist')
      return of(false)
    }
  }
}

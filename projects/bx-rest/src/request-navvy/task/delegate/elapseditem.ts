import { Injectable } from '@angular/core'
import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { BXRestTaskElapsedItem } from '../../../request/task/elapseditem'
import { Navvy } from '../../../services/navvy'
import { BXRestMapTaskElapsedItem } from '../../../map/task/elapseditem'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDelegateElapsedItem {

  private Navvy: Navvy<BXRestTaskElapsedItem, BXRestMapTaskElapsedItem>

  constructor(
    private BXRestElapsedItem: BXRestTaskElapsedItem,
    private BXRestMapElapsedItem: BXRestMapTaskElapsedItem,
  ) {
    this.Navvy = new Navvy(this.BXRestElapsedItem, this.BXRestMapElapsedItem)
  }

  getList(
    param: iBXRestParamElapseditemGet = {}
  ) {
    if (param) {
      if (!param.TASKID && !param.SELECT) {
        param.SELECT = ['*']
      }
      if (!param.TASKID && !param.PARAMS) {
        param.PARAMS = {
          NAV_PARAMS: {
            nPageSize: 50,
            iNumPage: 1
          }
        }
      }
    }
    return this.Navvy.alterPagNav(
      this.BXRestElapsedItem.getList,
      param,
      this.BXRestMapElapsedItem.getList
    )
  }


}

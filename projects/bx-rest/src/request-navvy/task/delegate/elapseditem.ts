import { Injectable } from '@angular/core'
import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { BXRestTaskElapseditem } from '../../../request/task/elapseditem'
import { Navvy } from '../../../services/navvy'
import { BXRestMapTaskElapseditem } from '../../../map/task/elapseditem'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyDelegateElapseditem {

  private Navvy: Navvy<BXRestTaskElapseditem, BXRestMapTaskElapseditem>

  constructor(
    private BXRestElapseditem: BXRestTaskElapseditem,
    private BXRestMapElapseditem: BXRestMapTaskElapseditem,
  ) {
    this.Navvy = new Navvy(this.BXRestElapseditem, this.BXRestMapElapseditem)
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
      this.BXRestElapseditem.getList,
      param,
      this.BXRestMapElapseditem.getList
    )
  }


}

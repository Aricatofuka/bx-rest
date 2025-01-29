import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { Navvy } from '../../../services/navvy'
import { BXRestMapTaskElapsedItem } from '../../../map/task/elapseditem'
import { $elapseditem, $getlist, $task } from '../../../consts/part-name-methods'

export class BXRestNavvyDelegateElapsedItem {

  private Navvy = new Navvy()

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
      [$task, $elapseditem, $getlist],
      param,
      BXRestMapTaskElapsedItem.getList
    )
  }

}

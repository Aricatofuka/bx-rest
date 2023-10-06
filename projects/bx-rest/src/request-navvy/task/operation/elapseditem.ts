import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { BXRestNavvyElapseditem } from '../elapseditem'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { iBXRestTaskElapsedItem, iBXRestTaskElapsedItemHttp } from '../../../typification/rest/task/elapseditem/item'
import { $elapseditem, $getlist, $task } from '../../../consts/part-name-metods'
import { map } from 'rxjs/operators'
import { BXRestMapTaskElapseditem } from '../../../map/task/elapseditem'

export class BXRestNavvyOperationElapseditem {

  constructor(
    private http: HttpBXServices,
    private BXRestNavvyElapseditem: BXRestNavvyElapseditem,
    private BXRestMapElapseditem: BXRestMapTaskElapseditem,
  ) {
  }

  getByInterval(idsUsers: number[], dateStart: Date, dateEnd: Date) {
    const param: iBXRestParamElapseditemGet = {
      ORDER: {
        ID: 'DESC'
      },
      FILTER: {
        USER_ID: idsUsers,
        '>=CREATED_DATE': dateStart.toLocaleString('ru-Ru'),
        '<=CREATED_DATE': dateEnd.toLocaleString('ru-Ru'),
      }
    }
    return this.BXRestNavvyElapseditem.getList(param)
  }

  getListByIDTask(ids: number[]) {
    return this.http.branch<iBXRestParamElapseditemGet, iBXRestTaskElapsedItemHttp[]>
    (
      ids.map(i => {
        return {
          name: this.http.getNameMethod([$task, $elapseditem, $getlist]),
          param: {
            TASKID: i
          }
        }
      })
    ).pipe(
      map(v => {
        if (v && v.length) {
          return this.http.mapBranchResultWithoutKey(v).map(
            i => this.BXRestMapElapseditem.getList(i)
          ).filter((i): i is iBXRestTaskElapsedItem[] => i !== undefined).flat()
        }
        return undefined
      })
    )
  }
}

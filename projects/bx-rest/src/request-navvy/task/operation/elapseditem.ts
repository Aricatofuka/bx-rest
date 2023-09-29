import { Injectable } from '@angular/core'
import { BXRestElapseditem } from '../../../request/task/elapseditem'
import { BXRestMapTaskElapseditem } from '../../../map/task/elapseditem'
import { Navvy } from '../../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyOperationElapseditem {

  private Navvy: Navvy<BXRestElapseditem, BXRestMapTaskElapseditem>

  constructor(
    private BXRestElapseditem: BXRestElapseditem,
    private BXRestMapElapseditem: BXRestMapTaskElapseditem,
  ) {
    this.Navvy = new Navvy(this.BXRestElapseditem, this.BXRestMapElapseditem)
  }

  getByInterval(idsUsers: number[], dateStart: Date, dateEnd: Date) {
    return this.Navvy.simpleWithArg(
      this.BXRestElapseditem.getList,
      {
        ORDER: {
          ID: 'DESC'
        },
        FILTER: {
          USER_ID: idsUsers,
          '>=CREATED_DATE': dateStart.toLocaleString('ru-Ru'),
          '<=CREATED_DATE': dateEnd.toLocaleString('ru-Ru'),
        }
      }
    )
  }
}

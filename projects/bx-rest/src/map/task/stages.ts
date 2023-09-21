import { Injectable } from '@angular/core'
import { iBXRestTaskStage, iBXRestTaskStageHttp } from '../../typification/rest/task/stages/stage'
import { BaseMapServices } from '../base'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTaskStage extends BaseMapServices {

  get(value: iBXRestTaskStageHttp[] | undefined) : iBXRestTaskStage[] | undefined{
    return (value) ? value.map(i => Object.assign(i,
        {
          SORT: this.toNum(i.SORT),
          ID: this.toNum(i.ID),
          ENTITY_ID: this.toNum(i.ENTITY_ID)
        }
      )
    ) as iBXRestTaskStage[] : undefined
  }

}

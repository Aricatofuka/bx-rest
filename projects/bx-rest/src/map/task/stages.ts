import { iBXRestTaskStage, iBXRestTaskStageHttp } from '../../typification/rest/task/stages/stage'
import { toNum } from '../../services/base'

export class BXRestMapTaskStage {

  static get(value: iBXRestTaskStageHttp[] | undefined) : iBXRestTaskStage[] | undefined{
    return (value) ? value.map(i => Object.assign(i,
        {
          SORT: toNum(i.SORT),
          ID: toNum(i.ID),
          ENTITY_ID: toNum(i.ENTITY_ID)
        }
      )
    ) as iBXRestTaskStage[] : undefined
  }

}

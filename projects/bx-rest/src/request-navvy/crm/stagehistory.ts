import { Navvy } from '../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../typification/rest/crm'
import { $crm, $list, $stagehistory } from '../../consts/part-name-methods'

export class BXRestNavvyCrmStageHistory {
  private readonly Navvy = new Navvy()

  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>(
      [$crm, $stagehistory, $list], param
    )
  }
}


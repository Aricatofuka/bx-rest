import { Navvy } from '../../../services/navvy'
import { iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $delete, $trace, $tracking } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmTrackingTrace {
  private readonly Navvy = new Navvy()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $tracking, $trace, $add], param
    )
  }

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $tracking, $trace, $delete], param
    )
  }
}


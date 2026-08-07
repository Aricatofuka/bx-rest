import { Navvy } from '../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../typification/rest/crm'
import { $add, $crm, $deletebyfilter, $getFieldsExact, $list, $orderentity } from '../../consts/part-name-methods'

export class BXRestNavvyCrmOrderEntity {
  private readonly Navvy = new Navvy()

  add(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $orderentity, $add], param
    )
  }

  deleteByFilter(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>(
      [$crm, $orderentity, $deletebyfilter], param
    )
  }

  getFields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $orderentity, $getFieldsExact])
  }

  list(param: iBXRestCrmParams = {}) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>(
      [$crm, $orderentity, $list], param
    )
  }
}


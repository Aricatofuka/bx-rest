import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $deal, $delete, $expose, $fields, $get, $list, $recurring, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmDealRecurring {
  private readonly Navvy = new Navvy()

  add(param: iBXRestCrmParams) { return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $deal, $recurring, $add], param) }
  delete(param: iBXRestCrmParams) { return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $recurring, $delete], param) }
  expose(param: iBXRestCrmParams) { return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $deal, $recurring, $expose], param) }
  fields() { return this.Navvy.simple<iBXRestCrmObject>([$crm, $deal, $recurring, $fields]) }
  get(param: iBXRestCrmParams) { return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $deal, $recurring, $get], param) }
  list(param: iBXRestCrmParams = {}) { return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $deal, $recurring, $list], param) }
  update(param: iBXRestCrmParams) { return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $recurring, $update], param) }
}

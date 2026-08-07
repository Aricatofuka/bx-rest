import { Navvy } from '../../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../../typification/rest/crm'
import { $activity, $blocks, $crm, $delete, $get, $layout, $set } from '../../../../consts/part-name-methods'

export class BXRestNavvyCrmActivityLayoutBlocks  {
  private readonly Navvy = new Navvy()

  delete(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $layout, $blocks, $delete], param)
  }

  get(param: iBXRestCrmParams) {
    return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $activity, $layout, $blocks, $get], param)
  }

  set(param: iBXRestCrmParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $activity, $layout, $blocks, $set], param)
  }
}


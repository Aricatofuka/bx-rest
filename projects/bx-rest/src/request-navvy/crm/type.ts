import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestParamCrmEntityType,
  iBXRestParamCrmTypeAdd,
  iBXRestParamCrmTypeId,
  iBXRestParamCrmTypeList,
  iBXRestParamCrmTypeUpdate
} from '../../typification/rest/crm'
import { $add, $crm, $delete, $fields, $get, $getByEntityTypeId, $list, $type, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCrmType {
  private readonly Navvy = new Navvy()

  add(param: iBXRestParamCrmTypeAdd) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmTypeAdd>(
      [$crm, $type, $add], param
    )
  }

  delete(param: iBXRestParamCrmTypeId) {
    return this.Navvy.simple<null, null, iBXRestParamCrmTypeId>(
      [$crm, $type, $delete], param
    )
  }

  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $type, $fields])
  }

  get(param: iBXRestParamCrmTypeId) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmTypeId>(
      [$crm, $type, $get], param
    )
  }

  getByEntityTypeId(param: iBXRestParamCrmEntityType) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmEntityType>(
      [$crm, $type, $getByEntityTypeId], param
    )
  }

  list(param: iBXRestParamCrmTypeList = {}) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmTypeList,
      'types'
    >([$crm, $type, $list], param, 'types')
  }

  update(param: iBXRestParamCrmTypeUpdate) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmTypeUpdate>(
      [$crm, $type, $update], param
    )
  }
}

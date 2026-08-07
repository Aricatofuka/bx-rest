import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestParamCrmCategoryAdd,
  iBXRestParamCrmCategoryId,
  iBXRestParamCrmCategoryList,
  iBXRestParamCrmCategoryUpdate,
  iBXRestParamCrmEntityType
} from '../../typification/rest/crm'
import { $add, $category, $crm, $delete, $fields, $get, $list, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCrmCategory {
  private readonly Navvy = new Navvy()

  add(param: iBXRestParamCrmCategoryAdd) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmCategoryAdd>(
      [$crm, $category, $add], param
    )
  }

  delete(param: iBXRestParamCrmCategoryId) {
    return this.Navvy.simple<null, null, iBXRestParamCrmCategoryId>(
      [$crm, $category, $delete], param
    )
  }

  fields(param: iBXRestParamCrmEntityType) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmEntityType>(
      [$crm, $category, $fields], param
    )
  }

  get(param: iBXRestParamCrmCategoryId) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmCategoryId>(
      [$crm, $category, $get], param
    )
  }

  list(param: iBXRestParamCrmCategoryList) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmCategoryList,
      'categories'
    >([$crm, $category, $list], param, 'categories')
  }

  update(param: iBXRestParamCrmCategoryUpdate) {
    return this.Navvy.simple<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmCategoryUpdate
    >([$crm, $category, $update], param)
  }
}

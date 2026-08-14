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

  /**
   * Создаёт новую воронку.
   */
  add(param: iBXRestParamCrmCategoryAdd) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmCategoryAdd>(
      [$crm, $category, $add], param
    )
  }

  /**
   * Удаляет воронку.
   */
  delete(param: iBXRestParamCrmCategoryId) {
    return this.Navvy.simple<null, null, iBXRestParamCrmCategoryId>(
      [$crm, $category, $delete], param
    )
  }

  /**
   * Возвращает описание полей воронки.
   */
  fields(param: iBXRestParamCrmEntityType) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmEntityType>(
      [$crm, $category, $fields], param
    )
  }

  /**
   * Возвращает воронку по идентификатору.
   */
  get(param: iBXRestParamCrmCategoryId) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmCategoryId>(
      [$crm, $category, $get], param
    )
  }

  /**
   * Возвращает список воронок.
   */
  list(param: iBXRestParamCrmCategoryList) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmCategoryList,
      'categories'
    >([$crm, $category, $list], param, 'categories')
  }

  /**
   * Обновляет воронку.
   */
  update(param: iBXRestParamCrmCategoryUpdate) {
    return this.Navvy.simple<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmCategoryUpdate
    >([$crm, $category, $update], param)
  }
}

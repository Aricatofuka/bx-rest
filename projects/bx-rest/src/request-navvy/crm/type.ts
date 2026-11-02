import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestCrmType,
  iBXRestCrmTypeResult,
  iBXRestParamCrmEntityType,
  iBXRestParamCrmTypeAdd,
  iBXRestParamCrmTypeId,
  iBXRestParamCrmTypeList,
  iBXRestParamCrmTypeUpdate
} from '../../typification/rest/crm'
import { $add, $crm, $delete, $fields, $get, $getByEntityTypeId, $list, $type, $update } from '../../consts/part-name-methods'

export class BXRestNavvyCrmType {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт новый смарт-процесс.
   */
  add(param: iBXRestParamCrmTypeAdd) {
    return this.Navvy.simple<iBXRestCrmTypeResult, iBXRestCrmTypeResult, iBXRestParamCrmTypeAdd>(
      [$crm, $type, $add], param
    )
  }

  /**
   * Удаляет смарт-процесс.
   */
  delete(param: iBXRestParamCrmTypeId) {
    return this.Navvy.simple<null, null, iBXRestParamCrmTypeId>(
      [$crm, $type, $delete], param
    )
  }

  /**
   * Возвращает поля смарт-процесса.
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmObject>([$crm, $type, $fields])
  }

  /**
   * Возвращает смарт-процесс по идентификатору.
   */
  get(param: iBXRestParamCrmTypeId) {
    return this.Navvy.simple<iBXRestCrmTypeResult, iBXRestCrmTypeResult, iBXRestParamCrmTypeId>(
      [$crm, $type, $get], param
    )
  }

  /**
   * Возвращает смарт-процесс по entityTypeId.
   */
  getByEntityTypeId(param: iBXRestParamCrmEntityType) {
    return this.Navvy.simple<iBXRestCrmTypeResult, iBXRestCrmTypeResult, iBXRestParamCrmEntityType>(
      [$crm, $type, $getByEntityTypeId], param
    )
  }

  /**
   * Возвращает список смарт-процессов.
   */
  list(param: iBXRestParamCrmTypeList = {}) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmType,
      iBXRestCrmType,
      iBXRestParamCrmTypeList,
      'types'
    >([$crm, $type, $list], param, 'types')
  }

  /**
   * Обновляет смарт-процесс.
   */
  update(param: iBXRestParamCrmTypeUpdate) {
    return this.Navvy.simple<iBXRestCrmTypeResult, iBXRestCrmTypeResult, iBXRestParamCrmTypeUpdate>(
      [$crm, $type, $update], param
    )
  }
}

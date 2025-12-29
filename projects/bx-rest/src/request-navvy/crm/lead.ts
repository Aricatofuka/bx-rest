import { Navvy } from '../../services/navvy'
import { $add, $crm, $delete, $get, $lead, $list, $update } from '../../consts/part-name-methods'
import {
  iBXRestParamCrmLeadAdd,
  iBXRestParamCrmLeadGet,
  iBXRestParamCrmLeadList,
  iBXRestParamCrmLeadUpdate,
  iBXRestParamCrmLeadDelete
} from '../../typification/rest/crm'
import { BXRestMapCrmLead } from '../../map/crm'

export class BXRestNavvyCrmLead {
  url = {
    /**
     * Создает новый лид
     */
    add: [$crm, $lead, $add],
    /**
     * Возвращает лид по идентификатору
     */
    get: [$crm, $lead, $get],
    /**
     * Возвращает список лидов
     */
    list: [$crm, $lead, $list],
    /**
     * Обновляет существующий лид
     */
    update: [$crm, $lead, $update],
    /**
     * Удаляет лид
     */
    delete: [$crm, $lead, $delete],
    /**
     * Возвращает описание полей лида
     */
    fields: [$crm, $lead, 'fields']
  }

  private Navvy = new Navvy()

  /**
   * Создает новый лид
   * @param param
   */
  add(param: iBXRestParamCrmLeadAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmLeadAdd>(this.url.add, param)
  }

  /**
   * Возвращает лид по идентификатору
   * @param param
   */
  get(param: iBXRestParamCrmLeadGet) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapCrmLead.get
    )
  }

  /**
   * Возвращает список лидов
   * @param param
   */
  list(param: iBXRestParamCrmLeadList) {
    return this.Navvy.pagNav(
      this.url.list,
      param,
      BXRestMapCrmLead.list
    )
  }

  /**
   * Обновляет существующий лид
   * @param param
   */
  update(param: iBXRestParamCrmLeadUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmLeadUpdate>(this.url.update, param)
  }

  /**
   * Удаляет лид
   * @param param
   */
  delete(param: iBXRestParamCrmLeadDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmLeadDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей лида
   */
  fields() {
    return this.Navvy.simple<Record<string, any>, Record<string, any>, undefined>(this.url.fields)
  }
}


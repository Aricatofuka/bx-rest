import { Navvy } from '../../services/navvy'
import { $add, $crm, $deal, $delete, $get, $list, $update } from '../../consts/part-name-methods'
import {
  iBXRestParamCrmDealAdd,
  iBXRestParamCrmDealGet,
  iBXRestParamCrmDealList,
  iBXRestParamCrmDealUpdate,
  iBXRestParamCrmDealDelete
} from '../../typification/rest/crm'
import { BXRestMapCrmDeal } from '../../map/crm'

export class BXRestNavvyCrmDeal {
  url = {
    /**
     * Создает новую сделку
     */
    add: [$crm, $deal, $add],
    /**
     * Возвращает сделку по идентификатору
     */
    get: [$crm, $deal, $get],
    /**
     * Возвращает список сделок
     */
    list: [$crm, $deal, $list],
    /**
     * Обновляет существующую сделку
     */
    update: [$crm, $deal, $update],
    /**
     * Удаляет сделку
     */
    delete: [$crm, $deal, $delete],
    /**
     * Возвращает описание полей сделки
     */
    fields: [$crm, $deal, 'fields']
  }

  private Navvy = new Navvy()

  /**
   * Создает новую сделку
   * @param param
   */
  add(param: iBXRestParamCrmDealAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmDealAdd>(this.url.add, param)
  }

  /**
   * Возвращает сделку по идентификатору
   * @param param
   */
  get(param: iBXRestParamCrmDealGet) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapCrmDeal.get
    )
  }

  /**
   * Возвращает список сделок
   * @param param
   */
  list(param: iBXRestParamCrmDealList) {
    return this.Navvy.pagNav(
      this.url.list,
      param,
      BXRestMapCrmDeal.list
    )
  }

  /**
   * Обновляет существующую сделку
   * @param param
   */
  update(param: iBXRestParamCrmDealUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmDealUpdate>(this.url.update, param)
  }

  /**
   * Удаляет сделку
   * @param param
   */
  delete(param: iBXRestParamCrmDealDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmDealDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей сделки
   */
  fields() {
    return this.Navvy.simple<Record<string, any>, Record<string, any>, undefined>(this.url.fields)
  }
}


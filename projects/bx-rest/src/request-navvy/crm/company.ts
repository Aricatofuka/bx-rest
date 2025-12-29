import { Navvy } from '../../services/navvy'
import { $add, $company, $crm, $delete, $get, $list, $update } from '../../consts/part-name-methods'
import {
  iBXRestParamCrmCompanyAdd,
  iBXRestParamCrmCompanyGet,
  iBXRestParamCrmCompanyList,
  iBXRestParamCrmCompanyUpdate,
  iBXRestParamCrmCompanyDelete
} from '../../typification/rest/crm'
import { BXRestMapCrmCompany } from '../../map/crm'

export class BXRestNavvyCrmCompany {
  url = {
    /**
     * Создает новую компанию
     */
    add: [$crm, $company, $add],
    /**
     * Возвращает компанию по идентификатору
     */
    get: [$crm, $company, $get],
    /**
     * Возвращает список компаний
     */
    list: [$crm, $company, $list],
    /**
     * Обновляет существующую компанию
     */
    update: [$crm, $company, $update],
    /**
     * Удаляет компанию
     */
    delete: [$crm, $company, $delete],
    /**
     * Возвращает описание полей компании
     */
    fields: [$crm, $company, 'fields']
  }

  private Navvy = new Navvy()

  /**
   * Создает новую компанию
   * @param param
   */
  add(param: iBXRestParamCrmCompanyAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmCompanyAdd>(this.url.add, param)
  }

  /**
   * Возвращает компанию по идентификатору
   * @param param
   */
  get(param: iBXRestParamCrmCompanyGet) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapCrmCompany.get
    )
  }

  /**
   * Возвращает список компаний
   * @param param
   */
  list(param: iBXRestParamCrmCompanyList) {
    return this.Navvy.pagNav(
      this.url.list,
      param,
      BXRestMapCrmCompany.list
    )
  }

  /**
   * Обновляет существующую компанию
   * @param param
   */
  update(param: iBXRestParamCrmCompanyUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCompanyUpdate>(this.url.update, param)
  }

  /**
   * Удаляет компанию
   * @param param
   */
  delete(param: iBXRestParamCrmCompanyDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmCompanyDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей компании
   */
  fields() {
    return this.Navvy.simple<Record<string, any>, Record<string, any>, undefined>(this.url.fields)
  }
}


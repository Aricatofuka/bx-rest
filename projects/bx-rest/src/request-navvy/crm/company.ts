import { Navvy } from '../../services/navvy'
import { lowerCaseOrder } from '../../functions/lowerCaseOrder'
import { $add, $company, $crm, $delete, $fields, $get, $list, $update } from '../../consts/part-name-methods'
import {
  iBXRestParamCrmCompanyAdd,
  iBXRestParamCrmCompanyGet,
  iBXRestParamCrmCompanyList,
  iBXRestParamCrmCompanyUpdate,
  iBXRestParamCrmCompanyDelete
} from '../../typification/rest/crm'
import { BXRestMapCrmCompany } from '../../map/crm'
import { BXRestNavvyCrmCompanyContact } from './company/contact'
import { BXRestNavvyCrmCompanyDetails } from './company/details'
import { BXRestNavvyCrmCompanyUserField } from './company/userfield'

export class BXRestNavvyCrmCompany {
  /**
   * Контакты компании (`crm.company.contact.*`).
   */
  public readonly contact = new BXRestNavvyCrmCompanyContact()
  /**
   * Карточка компании (`crm.company.details.*`).
   */
  public readonly details = new BXRestNavvyCrmCompanyDetails()
  /**
   * Пользовательские поля компаний (`crm.company.userfield.*`).
   */
  public readonly userField = new BXRestNavvyCrmCompanyUserField()
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
    fields: [$crm, $company, $fields]
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
      // crm.company.list ждёт order в нижнем регистре ('asc'/'desc'), в отличие
      // от остального REST API — публичный тип унифицирован на iBXRestParamSort
      // ('ASC'/'DESC'), а тут приводим обратно к тому, что реально нужно
      // отправить на бэкенд. См. lowerCaseOrder.
      { ...param, order: lowerCaseOrder(param.order) },
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


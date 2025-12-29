import clone from 'just-clone'
import { iBXRestCrmCompany, iBXRestCrmCompanyHttp } from '../../typification/rest/crm'
import { toBool, toBXYorN, toDate, toISOStringWithTimezone, toNum, toStr } from '../../services/base'

export class BXRestMapCrmCompany {
  /**
   * Преобразует массив компаний из HTTP формата в локальный
   */
  static list(v: iBXRestCrmCompanyHttp[] | undefined): iBXRestCrmCompany[] | undefined {
    return (v) ? v.map(item => BXRestMapCrmCompany.httpToLocal(item)) : undefined
  }

  /**
   * Преобразует одну компанию из HTTP формата в локальный
   */
  static get(v: iBXRestCrmCompanyHttp | undefined): iBXRestCrmCompany | undefined {
    return (v) ? BXRestMapCrmCompany.httpToLocal(v) : undefined
  }

  /**
   * Преобразует компанию из HTTP формата в локальный
   */
  static httpToLocal(company: iBXRestCrmCompanyHttp): iBXRestCrmCompany {
    return Object.assign(clone(company), {
      ID: toNum(company.ID),
      LEAD_ID: company.LEAD_ID ? toNum(company.LEAD_ID) : undefined,
      ASSIGNED_BY_ID: company.ASSIGNED_BY_ID ? toNum(company.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: company.CREATED_BY_ID ? toNum(company.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: company.MODIFY_BY_ID ? toNum(company.MODIFY_BY_ID) : undefined,
      DATE_CREATE: company.DATE_CREATE ? toDate(company.DATE_CREATE) : undefined,
      DATE_MODIFY: company.DATE_MODIFY ? toDate(company.DATE_MODIFY) : undefined,
      OPENED: company.OPENED ? toBool(company.OPENED) : undefined,
      IS_MY_COMPANY: company.IS_MY_COMPANY ? toBool(company.IS_MY_COMPANY) : undefined,
      EMPLOYEES: company.EMPLOYEES ? toNum(company.EMPLOYEES) : undefined,
      REVENUE: company.REVENUE ? toNum(company.REVENUE) : undefined
    })
  }

  /**
   * Преобразует компанию из локального формата в HTTP
   */
  static localToHttp(company: iBXRestCrmCompany): iBXRestCrmCompanyHttp {
    return Object.assign(clone(company), {
      ID: toStr(company.ID),
      LEAD_ID: company.LEAD_ID ? toStr(company.LEAD_ID) : undefined,
      ASSIGNED_BY_ID: company.ASSIGNED_BY_ID ? toStr(company.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: company.CREATED_BY_ID ? toStr(company.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: company.MODIFY_BY_ID ? toStr(company.MODIFY_BY_ID) : undefined,
      DATE_CREATE: company.DATE_CREATE ? toISOStringWithTimezone(company.DATE_CREATE) : undefined,
      DATE_MODIFY: company.DATE_MODIFY ? toISOStringWithTimezone(company.DATE_MODIFY) : undefined,
      OPENED: company.OPENED !== undefined ? toBXYorN(company.OPENED) : undefined,
      IS_MY_COMPANY: company.IS_MY_COMPANY !== undefined ? toBXYorN(company.IS_MY_COMPANY) : undefined,
      EMPLOYEES: company.EMPLOYEES ? toStr(company.EMPLOYEES) : undefined,
      REVENUE: company.REVENUE ? toStr(company.REVENUE) : undefined
    })
  }
}


import clone from 'just-clone'
import { iBXRestCrmDeal, iBXRestCrmDealHttp } from '../../typification/rest/crm'
import { toBool, toBXYorN, toDate, toISOStringWithTimezone, toNum, toStr } from '../../services/base'

export class BXRestMapCrmDeal {
  /**
   * Преобразует массив сделок из HTTP формата в локальный
   */
  static list(v: iBXRestCrmDealHttp[] | undefined): iBXRestCrmDeal[] | undefined {
    return (v) ? v.map(item => BXRestMapCrmDeal.httpToLocal(item)) : undefined
  }

  /**
   * Преобразует одну сделку из HTTP формата в локальный
   */
  static get(v: iBXRestCrmDealHttp | undefined): iBXRestCrmDeal | undefined {
    return (v) ? BXRestMapCrmDeal.httpToLocal(v) : undefined
  }

  /**
   * Преобразует сделку из HTTP формата в локальный
   */
  static httpToLocal(deal: iBXRestCrmDealHttp): iBXRestCrmDeal {
    return Object.assign(clone(deal), {
      ID: toNum(deal.ID),
      COMPANY_ID: deal.COMPANY_ID ? toNum(deal.COMPANY_ID) : undefined,
      CONTACT_ID: deal.CONTACT_ID ? toNum(deal.CONTACT_ID) : undefined,
      ASSIGNED_BY_ID: deal.ASSIGNED_BY_ID ? toNum(deal.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: deal.CREATED_BY_ID ? toNum(deal.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: deal.MODIFY_BY_ID ? toNum(deal.MODIFY_BY_ID) : undefined,
      DATE_CREATE: deal.DATE_CREATE ? toDate(deal.DATE_CREATE) : undefined,
      DATE_MODIFY: deal.DATE_MODIFY ? toDate(deal.DATE_MODIFY) : undefined,
      BEGINDATE: deal.BEGINDATE ? toDate(deal.BEGINDATE) : undefined,
      CLOSEDATE: deal.CLOSEDATE ? toDate(deal.CLOSEDATE) : undefined,
      OPENED: deal.OPENED ? toBool(deal.OPENED) : undefined,
      IS_MANUAL_OPPORTUNITY: deal.IS_MANUAL_OPPORTUNITY ? toBool(deal.IS_MANUAL_OPPORTUNITY) : undefined,
      OPPORTUNITY: deal.OPPORTUNITY ? toNum(deal.OPPORTUNITY) : undefined,
      PROBABILITY: deal.PROBABILITY ? toNum(deal.PROBABILITY) : undefined,
      TAX_VALUE: deal.TAX_VALUE ? toNum(deal.TAX_VALUE) : undefined,
      LOCATION_ID: deal.LOCATION_ID ? toNum(deal.LOCATION_ID) : undefined
    })
  }

  /**
   * Преобразует сделку из локального формата в HTTP
   */
  static localToHttp(deal: iBXRestCrmDeal): iBXRestCrmDealHttp {
    return Object.assign(clone(deal), {
      ID: toStr(deal.ID),
      COMPANY_ID: deal.COMPANY_ID ? toStr(deal.COMPANY_ID) : undefined,
      CONTACT_ID: deal.CONTACT_ID ? toStr(deal.CONTACT_ID) : undefined,
      ASSIGNED_BY_ID: deal.ASSIGNED_BY_ID ? toStr(deal.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: deal.CREATED_BY_ID ? toStr(deal.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: deal.MODIFY_BY_ID ? toStr(deal.MODIFY_BY_ID) : undefined,
      DATE_CREATE: deal.DATE_CREATE ? toISOStringWithTimezone(deal.DATE_CREATE) : undefined,
      DATE_MODIFY: deal.DATE_MODIFY ? toISOStringWithTimezone(deal.DATE_MODIFY) : undefined,
      BEGINDATE: deal.BEGINDATE ? toISOStringWithTimezone(deal.BEGINDATE) : undefined,
      CLOSEDATE: deal.CLOSEDATE ? toISOStringWithTimezone(deal.CLOSEDATE) : undefined,
      OPENED: deal.OPENED !== undefined ? toBXYorN(deal.OPENED) : undefined,
      IS_MANUAL_OPPORTUNITY: deal.IS_MANUAL_OPPORTUNITY !== undefined ? toBXYorN(deal.IS_MANUAL_OPPORTUNITY) : undefined,
      OPPORTUNITY: deal.OPPORTUNITY ? toStr(deal.OPPORTUNITY) : undefined,
      PROBABILITY: deal.PROBABILITY ? toStr(deal.PROBABILITY) : undefined,
      TAX_VALUE: deal.TAX_VALUE ? toStr(deal.TAX_VALUE) : undefined,
      LOCATION_ID: deal.LOCATION_ID ? toStr(deal.LOCATION_ID) : undefined
    })
  }
}


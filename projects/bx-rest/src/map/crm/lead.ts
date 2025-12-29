import clone from 'just-clone'
import { iBXRestCrmLead, iBXRestCrmLeadHttp } from '../../typification/rest/crm'
import { toBool, toBXYorN, toDate, toISOStringWithTimezone, toNum, toStr } from '../../services/base'

export class BXRestMapCrmLead {
  /**
   * Преобразует массив лидов из HTTP формата в локальный
   */
  static list(v: iBXRestCrmLeadHttp[] | undefined): iBXRestCrmLead[] | undefined {
    return (v) ? v.map(item => BXRestMapCrmLead.httpToLocal(item)) : undefined
  }

  /**
   * Преобразует один лид из HTTP формата в локальный
   */
  static get(v: iBXRestCrmLeadHttp | undefined): iBXRestCrmLead | undefined {
    return (v) ? BXRestMapCrmLead.httpToLocal(v) : undefined
  }

  /**
   * Преобразует лид из HTTP формата в локальный
   */
  static httpToLocal(lead: iBXRestCrmLeadHttp): iBXRestCrmLead {
    return Object.assign(clone(lead), {
      ID: toNum(lead.ID),
      COMPANY_ID: lead.COMPANY_ID ? toNum(lead.COMPANY_ID) : undefined,
      CONTACT_ID: lead.CONTACT_ID ? toNum(lead.CONTACT_ID) : undefined,
      ASSIGNED_BY_ID: lead.ASSIGNED_BY_ID ? toNum(lead.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: lead.CREATED_BY_ID ? toNum(lead.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: lead.MODIFY_BY_ID ? toNum(lead.MODIFY_BY_ID) : undefined,
      DATE_CREATE: lead.DATE_CREATE ? toDate(lead.DATE_CREATE) : undefined,
      DATE_MODIFY: lead.DATE_MODIFY ? toDate(lead.DATE_MODIFY) : undefined,
      BIRTHDATE: lead.BIRTHDATE ? toDate(lead.BIRTHDATE) : undefined,
      OPENED: lead.OPENED ? toBool(lead.OPENED) : undefined,
      IS_MANUAL_OPPORTUNITY: lead.IS_MANUAL_OPPORTUNITY ? toBool(lead.IS_MANUAL_OPPORTUNITY) : undefined,
      HAS_PHONE: lead.HAS_PHONE ? toBool(lead.HAS_PHONE) : undefined,
      HAS_EMAIL: lead.HAS_EMAIL ? toBool(lead.HAS_EMAIL) : undefined,
      HAS_IMOL: lead.HAS_IMOL ? toBool(lead.HAS_IMOL) : undefined,
      OPPORTUNITY: lead.OPPORTUNITY ? toNum(lead.OPPORTUNITY) : undefined
    })
  }

  /**
   * Преобразует лид из локального формата в HTTP
   */
  static localToHttp(lead: iBXRestCrmLead): iBXRestCrmLeadHttp {
    return Object.assign(clone(lead), {
      ID: toStr(lead.ID),
      COMPANY_ID: lead.COMPANY_ID ? toStr(lead.COMPANY_ID) : undefined,
      CONTACT_ID: lead.CONTACT_ID ? toStr(lead.CONTACT_ID) : undefined,
      ASSIGNED_BY_ID: lead.ASSIGNED_BY_ID ? toStr(lead.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: lead.CREATED_BY_ID ? toStr(lead.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: lead.MODIFY_BY_ID ? toStr(lead.MODIFY_BY_ID) : undefined,
      DATE_CREATE: lead.DATE_CREATE ? toISOStringWithTimezone(lead.DATE_CREATE) : undefined,
      DATE_MODIFY: lead.DATE_MODIFY ? toISOStringWithTimezone(lead.DATE_MODIFY) : undefined,
      BIRTHDATE: lead.BIRTHDATE ? toISOStringWithTimezone(lead.BIRTHDATE) : undefined,
      OPENED: lead.OPENED !== undefined ? toBXYorN(lead.OPENED) : undefined,
      IS_MANUAL_OPPORTUNITY: lead.IS_MANUAL_OPPORTUNITY !== undefined ? toBXYorN(lead.IS_MANUAL_OPPORTUNITY) : undefined,
      HAS_PHONE: lead.HAS_PHONE !== undefined ? toBXYorN(lead.HAS_PHONE) : undefined,
      HAS_EMAIL: lead.HAS_EMAIL !== undefined ? toBXYorN(lead.HAS_EMAIL) : undefined,
      HAS_IMOL: lead.HAS_IMOL !== undefined ? toBXYorN(lead.HAS_IMOL) : undefined,
      OPPORTUNITY: lead.OPPORTUNITY ? toStr(lead.OPPORTUNITY) : undefined
    })
  }
}


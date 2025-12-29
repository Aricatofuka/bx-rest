import clone from 'just-clone'
import { iBXRestCrmContact, iBXRestCrmContactHttp } from '../../typification/rest/crm'
import { toBool, toBXYorN, toDate, toISOStringWithTimezone, toNum, toStr } from '../../services/base'

export class BXRestMapCrmContact {
  /**
   * Преобразует массив контактов из HTTP формата в локальный
   */
  static list(v: iBXRestCrmContactHttp[] | undefined): iBXRestCrmContact[] | undefined {
    return (v) ? v.map(item => BXRestMapCrmContact.httpToLocal(item)) : undefined
  }

  /**
   * Преобразует один контакт из HTTP формата в локальный
   */
  static get(v: iBXRestCrmContactHttp | undefined): iBXRestCrmContact | undefined {
    return (v) ? BXRestMapCrmContact.httpToLocal(v) : undefined
  }

  /**
   * Преобразует контакт из HTTP формата в локальный
   */
  static httpToLocal(contact: iBXRestCrmContactHttp): iBXRestCrmContact {
    return Object.assign(clone(contact), {
      ID: toNum(contact.ID),
      COMPANY_ID: contact.COMPANY_ID ? toNum(contact.COMPANY_ID) : undefined,
      LEAD_ID: contact.LEAD_ID ? toNum(contact.LEAD_ID) : undefined,
      ASSIGNED_BY_ID: contact.ASSIGNED_BY_ID ? toNum(contact.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: contact.CREATED_BY_ID ? toNum(contact.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: contact.MODIFY_BY_ID ? toNum(contact.MODIFY_BY_ID) : undefined,
      DATE_CREATE: contact.DATE_CREATE ? toDate(contact.DATE_CREATE) : undefined,
      DATE_MODIFY: contact.DATE_MODIFY ? toDate(contact.DATE_MODIFY) : undefined,
      BIRTHDATE: contact.BIRTHDATE ? toDate(contact.BIRTHDATE) : undefined,
      OPENED: contact.OPENED ? toBool(contact.OPENED) : undefined
    })
  }

  /**
   * Преобразует контакт из локального формата в HTTP
   */
  static localToHttp(contact: iBXRestCrmContact): iBXRestCrmContactHttp {
    return Object.assign(clone(contact), {
      ID: toStr(contact.ID),
      COMPANY_ID: contact.COMPANY_ID ? toStr(contact.COMPANY_ID) : undefined,
      LEAD_ID: contact.LEAD_ID ? toStr(contact.LEAD_ID) : undefined,
      ASSIGNED_BY_ID: contact.ASSIGNED_BY_ID ? toStr(contact.ASSIGNED_BY_ID) : undefined,
      CREATED_BY_ID: contact.CREATED_BY_ID ? toStr(contact.CREATED_BY_ID) : undefined,
      MODIFY_BY_ID: contact.MODIFY_BY_ID ? toStr(contact.MODIFY_BY_ID) : undefined,
      DATE_CREATE: contact.DATE_CREATE ? toISOStringWithTimezone(contact.DATE_CREATE) : undefined,
      DATE_MODIFY: contact.DATE_MODIFY ? toISOStringWithTimezone(contact.DATE_MODIFY) : undefined,
      BIRTHDATE: contact.BIRTHDATE ? toISOStringWithTimezone(contact.BIRTHDATE) : undefined,
      OPENED: contact.OPENED !== undefined ? toBXYorN(contact.OPENED) : undefined
    })
  }
}


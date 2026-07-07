import clone from 'just-clone'
import {
  iBXRestCrmQuote,
  iBXRestCrmQuoteHttp,
  iBXRestCrmQuoteProductRow,
  iBXRestCrmQuoteProductRowHttp,
  iBXRestCrmQuoteUserField,
  iBXRestCrmQuoteUserFieldHttp
} from '../../typification/rest/crm'
import { toBool, toDate, toNum } from '../../services/base'

function optionalNumber(value: string | number | null | undefined): number | undefined {
  return value === null || value === undefined || value === '' ? undefined : toNum(value)
}

function optionalDate(value: string | Date | null | undefined): Date | undefined {
  return value === null || value === undefined || value === '' ? undefined : toDate(value)
}

export class BXRestMapCrmQuote {
  static list(value: iBXRestCrmQuoteHttp[] | undefined): iBXRestCrmQuote[] | undefined {
    return value?.map(item => BXRestMapCrmQuote.get(item) as iBXRestCrmQuote)
  }

  static get(value: iBXRestCrmQuoteHttp | undefined): iBXRestCrmQuote | undefined {
    if (!value) return undefined

    return Object.assign(clone(value), {
      ID: toNum(value.ID),
      OPPORTUNITY: optionalNumber(value.OPPORTUNITY),
      TAX_VALUE: optionalNumber(value.TAX_VALUE),
      COMPANY_ID: optionalNumber(value.COMPANY_ID),
      CONTACT_ID: optionalNumber(value.CONTACT_ID),
      MYCOMPANY_ID: optionalNumber(value.MYCOMPANY_ID),
      ASSIGNED_BY_ID: optionalNumber(value.ASSIGNED_BY_ID),
      CREATED_BY_ID: optionalNumber(value.CREATED_BY_ID),
      MODIFY_BY_ID: optionalNumber(value.MODIFY_BY_ID),
      LEAD_ID: optionalNumber(value.LEAD_ID),
      DEAL_ID: optionalNumber(value.DEAL_ID),
      PERSON_TYPE_ID: optionalNumber(value.PERSON_TYPE_ID),
      LOCATION_ID: optionalNumber(value.LOCATION_ID),
      LAST_ACTIVITY_BY: optionalNumber(value.LAST_ACTIVITY_BY),
      BEGINDATE: optionalDate(value.BEGINDATE),
      CLOSEDATE: optionalDate(value.CLOSEDATE),
      ACTUAL_DATE: optionalDate(value.ACTUAL_DATE),
      DATE_CREATE: optionalDate(value.DATE_CREATE),
      DATE_MODIFY: optionalDate(value.DATE_MODIFY),
      LAST_COMMUNICATION_TIME: optionalDate(value.LAST_COMMUNICATION_TIME),
      LAST_ACTIVITY_TIME: optionalDate(value.LAST_ACTIVITY_TIME),
      OPENED: value.OPENED ? toBool(value.OPENED) : undefined,
      CLOSED: value.CLOSED ? toBool(value.CLOSED) : undefined
    })
  }
}

export class BXRestMapCrmQuoteProductRow {
  static list(value: iBXRestCrmQuoteProductRowHttp[] | undefined): iBXRestCrmQuoteProductRow[] | undefined {
    return value?.map(item => Object.assign(clone(item), {
      ID: toNum(item.ID),
      OWNER_ID: toNum(item.OWNER_ID),
      CUSTOMIZED: item.CUSTOMIZED ? toBool(item.CUSTOMIZED) : undefined,
      TAX_INCLUDED: item.TAX_INCLUDED ? toBool(item.TAX_INCLUDED) : undefined,
      DATE_RESERVE_END: optionalDate(item.DATE_RESERVE_END)
    }))
  }
}

export class BXRestMapCrmQuoteUserField {
  static list(value: iBXRestCrmQuoteUserFieldHttp[] | undefined): iBXRestCrmQuoteUserField[] | undefined {
    return value?.map(item => BXRestMapCrmQuoteUserField.get(item) as iBXRestCrmQuoteUserField)
  }

  static get(value: iBXRestCrmQuoteUserFieldHttp | undefined): iBXRestCrmQuoteUserField | undefined {
    if (!value) return undefined

    return Object.assign(clone(value), {
      ID: toNum(value.ID),
      SORT: toNum(value.SORT),
      MULTIPLE: toBool(value.MULTIPLE),
      MANDATORY: toBool(value.MANDATORY),
      SHOW_IN_LIST: toBool(value.SHOW_IN_LIST),
      EDIT_IN_LIST: toBool(value.EDIT_IN_LIST),
      IS_SEARCHABLE: toBool(value.IS_SEARCHABLE)
    })
  }
}

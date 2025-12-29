import { iBXRestYesNo } from '../../base/yes-no'

export interface iBXRestCrmCompany extends iBXRestCrmCompanyBase {
  ID: number
  LEAD_ID?: number
  ASSIGNED_BY_ID?: number
  CREATED_BY_ID?: number
  MODIFY_BY_ID?: number
  DATE_CREATE?: Date
  DATE_MODIFY?: Date
  OPENED?: boolean
  IS_MY_COMPANY?: boolean
  EMPLOYEES?: number
  REVENUE?: number
}

export interface iBXRestCrmCompanyHttp extends iBXRestCrmCompanyBase {
  ID: string
  LEAD_ID?: string
  ASSIGNED_BY_ID?: string
  CREATED_BY_ID?: string
  MODIFY_BY_ID?: string
  DATE_CREATE?: string
  DATE_MODIFY?: string
  OPENED?: iBXRestYesNo
  IS_MY_COMPANY?: iBXRestYesNo
  EMPLOYEES?: string
  REVENUE?: string
}

interface iBXRestCrmCompanyBase {
  TITLE?: string
  COMPANY_TYPE?: string
  LOGO?: string
  ADDRESS?: string
  BANKING_DETAILS?: string
  INDUSTRY?: string
  CURRENCY_ID?: string
  [key: string]: any
}


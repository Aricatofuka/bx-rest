import { iBXRestYesNo } from '../../base/yes-no'

export interface iBXRestCrmDeal extends iBXRestCrmDealBase {
  ID: number
  COMPANY_ID?: number
  CONTACT_ID?: number
  ASSIGNED_BY_ID?: number
  CREATED_BY_ID?: number
  MODIFY_BY_ID?: number
  DATE_CREATE?: Date
  DATE_MODIFY?: Date
  BEGINDATE?: Date
  CLOSEDATE?: Date
  OPENED?: boolean
  IS_MANUAL_OPPORTUNITY?: boolean
  OPPORTUNITY?: number
  PROBABILITY?: number
  TAX_VALUE?: number
  LOCATION_ID?: number
}

export interface iBXRestCrmDealHttp extends iBXRestCrmDealBase {
  ID: string
  COMPANY_ID?: string
  CONTACT_ID?: string
  ASSIGNED_BY_ID?: string
  CREATED_BY_ID?: string
  MODIFY_BY_ID?: string
  DATE_CREATE?: string
  DATE_MODIFY?: string
  BEGINDATE?: string
  CLOSEDATE?: string
  OPENED?: iBXRestYesNo
  IS_MANUAL_OPPORTUNITY?: iBXRestYesNo
  OPPORTUNITY?: string
  PROBABILITY?: string
  TAX_VALUE?: string
  LOCATION_ID?: string
}

interface iBXRestCrmDealBase {
  TITLE?: string
  TYPE_ID?: string
  STAGE_ID?: string
  CURRENCY_ID?: string
  COMMENTS?: string
  ADDITIONAL_INFO?: string
  [key: string]: any
}


import { iBXRestYesNo } from '../../base/yes-no'

export interface iBXRestCrmLead extends iBXRestCrmLeadBase {
  ID: number
  COMPANY_ID?: number
  CONTACT_ID?: number
  ASSIGNED_BY_ID?: number
  CREATED_BY_ID?: number
  MODIFY_BY_ID?: number
  DATE_CREATE?: Date
  DATE_MODIFY?: Date
  BIRTHDATE?: Date
  OPENED?: boolean
  IS_MANUAL_OPPORTUNITY?: boolean
  HAS_PHONE?: boolean
  HAS_EMAIL?: boolean
  HAS_IMOL?: boolean
  OPPORTUNITY?: number
}

export interface iBXRestCrmLeadHttp extends iBXRestCrmLeadBase {
  ID: string
  COMPANY_ID?: string
  CONTACT_ID?: string
  ASSIGNED_BY_ID?: string
  CREATED_BY_ID?: string
  MODIFY_BY_ID?: string
  DATE_CREATE?: string
  DATE_MODIFY?: string
  BIRTHDATE?: string
  OPENED?: iBXRestYesNo
  IS_MANUAL_OPPORTUNITY?: iBXRestYesNo
  HAS_PHONE?: iBXRestYesNo
  HAS_EMAIL?: iBXRestYesNo
  HAS_IMOL?: iBXRestYesNo
  OPPORTUNITY?: string
}

interface iBXRestCrmLeadBase {
  TITLE?: string
  HONORIFIC?: string
  NAME?: string
  SECOND_NAME?: string
  LAST_NAME?: string
  COMPANY_TITLE?: string
  SOURCE_ID?: string
  SOURCE_DESCRIPTION?: string
  STATUS_ID?: string
  STATUS_DESCRIPTION?: string
  STATUS_SEMANTIC_ID?: string
  CURRENCY_ID?: string
  COMMENTS?: string
  [key: string]: any
}


import { iBXRestYesNo } from '../../base/yes-no'

export interface iBXRestCrmContact extends iBXRestCrmContactBase {
  ID: number
  COMPANY_ID?: number
  LEAD_ID?: number
  ASSIGNED_BY_ID?: number
  CREATED_BY_ID?: number
  MODIFY_BY_ID?: number
  DATE_CREATE?: Date
  DATE_MODIFY?: Date
  BIRTHDATE?: Date
  OPENED?: boolean
}

export interface iBXRestCrmContactHttp extends iBXRestCrmContactBase {
  ID: string
  COMPANY_ID?: string
  LEAD_ID?: string
  ASSIGNED_BY_ID?: string
  CREATED_BY_ID?: string
  MODIFY_BY_ID?: string
  DATE_CREATE?: string
  DATE_MODIFY?: string
  BIRTHDATE?: string
  OPENED?: iBXRestYesNo
}

interface iBXRestCrmContactBase {
  HONORIFIC?: string
  NAME?: string
  SECOND_NAME?: string
  LAST_NAME?: string
  PHOTO?: string
  TYPE_ID?: string
  SOURCE_ID?: string
  SOURCE_DESCRIPTION?: string
  COMPANY_TITLE?: string
  POST?: string
  ADDRESS?: string
  COMMENTS?: string
  [key: string]: any
}


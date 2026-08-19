import { iAllBXGender } from './user'
import { iBXRestUserFile } from './add'

/** Parameters of `user.update`. Custom user fields may also be supplied. */
export interface iBXRestParamUserUpdate {
  ID: number
  ACTIVE?: boolean
  EMAIL?: string
  NAME?: string
  LAST_NAME?: string
  SECOND_NAME?: string
  PERSONAL_GENDER?: iAllBXGender
  PERSONAL_PROFESSION?: string
  PERSONAL_WWW?: string
  PERSONAL_BIRTHDAY?: string
  PERSONAL_PHOTO?: iBXRestUserFile
  PERSONAL_ICQ?: string
  PERSONAL_PHONE?: string
  PERSONAL_FAX?: string
  PERSONAL_MOBILE?: string
  PERSONAL_PAGER?: string
  PERSONAL_STREET?: string
  PERSONAL_CITY?: string
  PERSONAL_STATE?: string
  PERSONAL_ZIP?: string
  PERSONAL_COUNTRY?: string
  PERSONAL_MAILBOX?: string
  PERSONAL_NOTES?: string
  WORK_PHONE?: string
  WORK_COMPANY?: string
  WORK_POSITION?: string
  WORK_DEPARTMENT?: string
  WORK_WWW?: string
  WORK_FAX?: string
  WORK_PAGER?: string
  WORK_STREET?: string
  WORK_MAILBOX?: string
  WORK_CITY?: string
  WORK_STATE?: string
  WORK_ZIP?: string
  WORK_COUNTRY?: string
  WORK_PROFILE?: string
  WORK_LOGO?: iBXRestUserFile
  WORK_NOTES?: string
  UF_SKYPE_LINK?: string
  UF_ZOOM?: string
  UF_DEPARTMENT?: number[]
  UF_INTERESTS?: string
  UF_SKILLS?: string
  UF_WEB_SITES?: string
  UF_XING?: string
  UF_LINKEDIN?: string
  UF_FACEBOOK?: string
  UF_TWITTER?: string
  UF_SKYPE?: string
  UF_DISTRICT?: string
  UF_PHONE_INNER?: string
  [customField: string]: unknown
}

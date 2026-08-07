import { iBXRestYesNo } from '../base/yes-no'
import { iBXRestSonetGroupGetHttp } from './get'

export type iBXRestSonetGroupInitiatePermission = 'A' | 'E' | 'K'
export type iBXRestSonetGroupImage = string | [name: string, content: string]

export interface iBXRestParamSonetGroupCreate {
  NAME: string
  DESCRIPTION?: string
  VISIBLE?: iBXRestYesNo
  OPENED?: iBXRestYesNo
  CLOSED?: iBXRestYesNo
  KEYWORDS?: string
  INITIATE_PERMS?: iBXRestSonetGroupInitiatePermission
  PROJECT?: iBXRestYesNo
  PROJECT_DATE_START?: string
  PROJECT_DATE_FINISH?: string
  SCRUM_MASTER_ID?: number
  OWNER_ID?: number
  IMAGE?: iBXRestSonetGroupImage
  IMAGE_FILE_ID?: number
  SITE_ID?: string[]
  SUBJECT_ID?: number
}

export interface iBXRestParamSonetGroupId {
  GROUP_ID: number
}

export interface iBXRestParamSonetGroupSetOwner extends iBXRestParamSonetGroupId {
  USER_ID: number
}

export type iBXRestParamSonetGroupUpdate = iBXRestParamSonetGroupId &
  Partial<Omit<iBXRestParamSonetGroupCreate, 'PROJECT' | 'SCRUM_MASTER_ID' | 'SUBJECT_ID'>>

export interface iBXRestParamSonetGroupFeatureAccess extends iBXRestParamSonetGroupId {
  FEATURE: 'photo' | 'calendar' | 'tasks' | 'files' | 'blog' | string
  OPERATION: string
}

export interface iBXRestParamSonetGroupUserChange extends iBXRestParamSonetGroupId {
  USER_ID: number | number[]
}

export interface iBXRestParamSonetGroupUserGet {
  ID: number
}

export interface iBXRestSonetGroupUser {
  USER_ID: number
}

export interface iBXRestParamSonetGroupUserInvite extends iBXRestParamSonetGroupUserChange {
  MESSAGE?: string
}

export interface iBXRestParamSonetGroupUserRequest extends iBXRestParamSonetGroupId {
  MESSAGE?: string
}

export interface iBXRestParamSonetGroupUserUpdate extends iBXRestParamSonetGroupUserChange {
  ROLE: 'E' | 'K'
}

export type iBXRestSonetGroupUserGroup = iBXRestSonetGroupGetHttp

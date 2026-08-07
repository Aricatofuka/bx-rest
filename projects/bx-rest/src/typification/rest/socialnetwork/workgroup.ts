import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestYesNo } from '../base/yes-no'

export type iBXRestSocialNetworkWorkgroupSelect =
  | 'ACTIONS' | 'AVATAR' | 'AVATAR_DATA' | 'AVATAR_TYPES' | 'COUNTERS'
  | 'DATE_CREATE' | 'DEPARTMENTS' | 'EFFICIENCY' | 'FEATURES'
  | 'GROUP_MEMBERS_LIST' | 'LIST_OF_MEMBERS'
  | 'LIST_OF_MEMBERS_AWAITING_INVITE' | 'OWNER_DATA' | 'PIN'
  | 'PRIVACY_TYPE' | 'SUBJECT_DATA' | 'TAGS' | 'USER_DATA'
  | string

export interface iBXRestParamSocialNetworkWorkgroupGet {
  params: {
    groupId: number
    select?: iBXRestSocialNetworkWorkgroupSelect[]
    mode?: 'mobile'
  }
}

export interface iBXRestParamSocialNetworkWorkgroupList extends iBXRestPagination {
  filter?: Record<string, unknown>
  select?: string[]
  order?: Record<string, 'ASC' | 'DESC'>
  params?: {
    IS_ADMIN?: iBXRestYesNo
    siteId?: string
    mode?: 'mobile'
  }
}

export interface iBXRestSocialNetworkWorkgroup {
  ID: string | number
  ACTIVE?: iBXRestYesNo
  SUBJECT_ID?: string | number
  NAME?: string
  DESCRIPTION?: string
  KEYWORDS?: string
  CLOSED?: iBXRestYesNo
  VISIBLE?: iBXRestYesNo
  OPENED?: iBXRestYesNo
  PROJECT?: iBXRestYesNo
  LANDING?: iBXRestYesNo
  DATE_CREATE?: string
  DATE_UPDATE?: string
  DATE_ACTIVITY?: string
  IMAGE_ID?: string | number
  AVATAR_TYPE?: string
  OWNER_ID?: string | number
  NUMBER_OF_MEMBERS?: string | number
  NUMBER_OF_MODERATORS?: string | number
  INITIATE_PERMS?: string
  PROJECT_DATE_START?: string
  PROJECT_DATE_FINISH?: string
  SCRUM_OWNER_ID?: string | number
  SCRUM_MASTER_ID?: string | number
  SCRUM_SPRINT_DURATION?: string | number
  SCRUM_TASK_RESPONSIBLE?: string
  TYPE?: 'group' | 'project' | 'scrum' | 'collab'
  AVATAR?: string
  [field: string]: unknown
}

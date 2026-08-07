import { iBXRestYesNo } from '../base/yes-no'

export type iBXRestImObject = Record<string, unknown>

export interface iBXRestParamImDepartmentColleaguesList {
  USER_DATA?: iBXRestYesNo
  OFFSET?: number
  LIMIT?: number
}

export interface iBXRestParamImDepartmentGet {
  ID: number | number[]
  USER_DATA?: iBXRestYesNo
}

export type iBXRestParamImDepartmentEmployeesGet = iBXRestParamImDepartmentGet
export type iBXRestParamImDepartmentManagersGet = iBXRestParamImDepartmentGet

export interface iBXRestParamImDialogMessagesSearch {
  CHAT_ID: number
  SEARCH_MESSAGE?: string
  DATE_FROM?: string | Date
  DATE_TO?: string | Date
  DATE?: string | Date
  ORDER?: { ID?: 'ASC' | 'DESC' }
  LIMIT?: number
  LAST_ID?: number
}

export interface iBXRestParamImDiskFileCommit {
  CHAT_ID?: number
  DIALOG_ID?: string
  FILE_ID?: number | number[]
  UPLOAD_ID?: number | number[]
  MESSAGE?: string
  SILENT_MODE?: iBXRestYesNo
  AS_FILE?: iBXRestYesNo
}

export interface iBXRestParamImDiskFileDelete {
  CHAT_ID: number
  FILE_ID: number
}

export interface iBXRestParamImDiskFileSave {
  FILE_ID: number
}

export interface iBXRestParamImDiskFolderGet {
  CHAT_ID?: number
  DIALOG_ID?: string
}

export interface iBXRestParamImMessageAdd {
  DIALOG_ID: string | number
  MESSAGE: string
  ATTACH?: unknown
  KEYBOARD?: unknown
  MENU?: unknown
  SYSTEM?: iBXRestYesNo
  URL_PREVIEW?: iBXRestYesNo
}

export interface iBXRestParamImMessageCommand {
  MESSAGE_ID: number
  BOT_ID: number
  COMMAND: string
  COMMAND_PARAMS?: string
}

export interface iBXRestParamImMessageDelete {
  MESSAGE_ID: number
}

export interface iBXRestParamImMessageLike {
  MESSAGE_ID: number
  ACTION?: 'auto' | 'plus' | 'minus'
}

export interface iBXRestParamImMessageShare {
  MESSAGE_ID: number
  DIALOG_ID: string | number
  TYPE: 'CHAT' | 'TASK' | 'POST' | 'CALEND'
}

export interface iBXRestParamImMessageUpdate {
  MESSAGE_ID: number
  MESSAGE?: string
  ATTACH?: unknown
  KEYBOARD?: unknown
  MENU?: unknown
  URL_PREVIEW?: iBXRestYesNo
  IS_EDITED?: iBXRestYesNo
}

export interface iBXRestParamImNotifySend {
  USER_ID: number
  TYPE?: 'SYSTEM' | 'CONFIRM' | string
  MESSAGE: string
  MESSAGE_OUT?: string
  TAG?: string
  SUB_TAG?: string
  ATTACH?: unknown
}

export interface iBXRestParamImNotifyAnswer {
  NOTIFY_ID: number
  ANSWER_TEXT: string
}

export interface iBXRestParamImNotifyConfirm {
  NOTIFY_ID: number
  NOTIFY_VALUE: string
}

export interface iBXRestParamImNotifyDelete {
  ID?: number
  TAG?: string
  SUB_TAG?: string
  CLIENT_ID?: string
}

export interface iBXRestParamImNotifyGet {
  LAST_ID?: number
  LAST_TYPE?: number
  LIMIT?: number
  CONVERT_TEXT?: iBXRestYesNo
}

export interface iBXRestParamImNotifyHistorySearch {
  SEARCH_TEXT?: string
  SEARCH_TYPE?: string
  SEARCH_TYPES?: string[]
  SEARCH_DATE?: string | Date
  SEARCH_DATE_FROM?: string | Date
  SEARCH_DATE_TO?: string | Date
  SEARCH_AUTHORS?: number[]
  LAST_ID?: number
  LIMIT?: number
  CONVERT_TEXT?: iBXRestYesNo
  GROUP_TAG?: iBXRestYesNo
}

export type iBXRestParamImNotifyPersonalAdd = Omit<iBXRestParamImNotifySend, 'TYPE'>
export type iBXRestParamImNotifySystemAdd = Omit<iBXRestParamImNotifySend, 'TYPE'>

export interface iBXRestParamImNotifyRead {
  ID?: number
  ACTION?: iBXRestYesNo
  ONLY_CURRENT?: iBXRestYesNo
}

export interface iBXRestParamImNotifyReadList {
  IDS: number[]
  ACTION?: iBXRestYesNo
}

export interface iBXRestParamImSearchChatList {
  FIND?: string
  FIND_LINES?: string
  OFFSET?: number
  LIMIT?: number
}

export interface iBXRestParamImSearchDepartmentList {
  FIND: string
  USER_DATA?: iBXRestYesNo
  OFFSET?: number
  LIMIT?: number
}

export interface iBXRestParamImSearchLastDialog {
  DIALOG_ID: string | number
}

export interface iBXRestParamImSearchLastGet {
  SKIP_OPENLINES?: iBXRestYesNo
  SKIP_CHAT?: iBXRestYesNo
  SKIP_DIALOG?: iBXRestYesNo
}

export interface iBXRestParamImSearchUserList {
  FIND: string
  BUSINESS?: iBXRestYesNo
  OFFSET?: number
  LIMIT?: number
}

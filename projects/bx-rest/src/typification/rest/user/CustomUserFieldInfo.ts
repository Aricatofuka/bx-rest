import { iBXRestUserKey } from 'bx-rest/typification/rest/user/user'
import { iBXRestYesNo } from 'bx-rest/typification/rest/base/YesNo'

export interface iCustomUserFieldInfo {
  ID: string,
  ENTITY_ID: "USER",
  FIELD_NAME: iBXRestUserKey,
  USER_TYPE_ID: iCustomUserFieldInfoType,
  XML_ID: string | null,
  SORT: string,
  MULTIPLE: iBXRestYesNo,
  MANDATORY: iBXRestYesNo,
  SHOW_FILTER: 'E' | 'N', // ??? это что вообще?
  SHOW_IN_LIST: iBXRestYesNo,
  EDIT_IN_LIST: iBXRestYesNo,
  IS_SEARCHABLE: iBXRestYesNo,
  SETTINGS:
    iCustomUserFieldInfoSETTINGSTypeString
    | iCustomUserFieldInfoSETTINGSTypeFile
    | iCustomUserFieldInfoSETTINGSTypeEnumeration
    | iCustomUserFieldInfoSETTINGSTypeDatetime
  LIST?: iCustomUserFieldInfoSETTINGSTypeEnumerationLIST[],
}

export interface iCustomUserFieldInfoSETTINGSTypeString {
  SIZE: number,
  ROWS: number,
  REGEXP: string | null,
  MIN_LENGTH: number,
  MAX_LENGTH: number,
  DEFAULT_VALUE: string | null
}

export interface iCustomUserFieldInfoSETTINGSTypeFile {
  SIZE: number,
  LIST_WIDTH: number,
  LIST_HEIGHT: number,
  MAX_SHOW_SIZE: number,
  MAX_ALLOWED_SIZE: number,
  EXTENSIONS: any[], // TODO: Позже описать
  TARGET_BLANK: iBXRestYesNo
}

export interface iCustomUserFieldInfoSETTINGSTypeEnumeration {
  DISPLAY: 'UI' | 'DIALOG',
  LIST_HEIGHT: number,
  CAPTION_NO_VALUE: string,
  SHOW_NO_VALUE: iBXRestYesNo
}

export interface iCustomUserFieldInfoSETTINGSTypeEnumerationLIST{
  ID: string,
  SORT: string,
  VALUE: string,
  DEF: iBXRestYesNo
}

export interface iCustomUserFieldInfoSETTINGSTypeDatetime {
  DEFAULT_VALUE: {
    TYPE: 'NONE',
    VALUE: string
  },
  "USE_SECOND": iBXRestYesNo,
  "USE_TIMEZONE": iBXRestYesNo
}


export type iCustomUserFieldInfoType = 'string' | 'file' | 'enumeration' | 'datetime'



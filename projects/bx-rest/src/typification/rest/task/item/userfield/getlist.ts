import { iBXRestYesNo } from '../../../base/YesNo'
import { iBXRestOrderOption } from '../../../base/OrderOptions'
import { iBXRestPagination } from '../../../base/ApiPaginationBX'

// TODO: кастомный поля в методах для пользователей и для задач весьм одинаковы, надобы обьеденить


export interface iBXRestParamTaskItemUserFieldGetlist extends iBXRestPagination{
  ORDER?: {[key in keyof iBXRestTaskItemUserFieldGetlistHttp]:iBXRestOrderOption}
  FILTER?: { // TODO: позде описать подробнее
    ID?: number | number[]
    USER_TYPE_ID?: 'string'
    FIELD_NAME?: string // принемает срого строку, иначе выдает внутренную ошибку в php связанную с типами
  }
}

export interface iBXRestTaskItemUserFieldGetlist {
  ID: number
  ENTITY_ID: 'TASKS_TASK'
  FIELD_NAME: string
  USER_TYPE_ID: iBXRestCustomTskFieldInfoType
  XML_ID: string | null
  SORT: string
  MULTIPLE: boolean
  MANDATORY: boolean
  SHOW_FILTER: 'E' | 'N', // ??? это что вообще?
  SHOW_IN_LIST: boolean
  EDIT_IN_LIST: boolean
  IS_SEARCHABLE: boolean
  SETTINGS:
    iCustomUserFieldInfoSETTINGSTypeString
    | iCustomUserFieldInfoSETTINGSTypeFile
    | iCustomUserFieldInfoSETTINGSTypeEnumeration
    | iCustomUserFieldInfoSETTINGSTypeDatetime
    | iCustomUserFieldInfoSETTINGSTypeCRM
  LIST?: iCustomUserFieldInfoSETTINGSTypeEnumerationLIST[],
}

export interface iBXRestTaskItemUserFieldGetlistHttp {
  ID: string
  ENTITY_ID: 'TASKS_TASK'
  FIELD_NAME: string // TODO: разобраться и оставить комментарий
  USER_TYPE_ID: iBXRestCustomTskFieldInfoType
  XML_ID: string | null
  SORT: string
  MULTIPLE: iBXRestYesNo
  MANDATORY: iBXRestYesNo
  SHOW_FILTER: 'E' | 'N', // ??? это что вообще?
  SHOW_IN_LIST: iBXRestYesNo
  EDIT_IN_LIST: iBXRestYesNo
  IS_SEARCHABLE: iBXRestYesNo
  SETTINGS:
    iCustomUserFieldInfoSETTINGSTypeString
    | iCustomUserFieldInfoSETTINGSTypeFile
    | iCustomUserFieldInfoSETTINGSTypeEnumeration
    | iCustomUserFieldInfoSETTINGSTypeDatetime
    | iCustomUserFieldInfoSETTINGSTypeCRM
  LIST?: iCustomUserFieldInfoSETTINGSTypeEnumerationLIST[],
}

export interface iCustomUserFieldInfoSETTINGSTypeCRM {
  LEAD: iBXRestYesNo
  CONTACT: iBXRestYesNo
  COMPANY: iBXRestYesNo
  DEAL: iBXRestYesNo
  ORDER: iBXRestYesNo
  SMART_INVOICE: iBXRestYesNo
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

export interface iCustomUserFieldInfoSETTINGSTypeEnumerationLIST {
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
  'USE_SECOND': iBXRestYesNo,
  'USE_TIMEZONE': iBXRestYesNo
}


export type iBXRestCustomTskFieldInfoType = 'string' | 'file' | 'enumeration' | 'datetime' | 'crm'

import { iBXRestYesNo } from '../../base/YesNo'

export interface iBXRestBlogPostEssence extends iBXRestBlogPostEssenceBase {
  EDIT_IN_LIST: boolean
  ID: number
  IS_SEARCHABLE: boolean
  MANDATORY: boolean
  MULTIPLE: boolean
  SHOW_FILTER: boolean
  SHOW_IN_LIST: boolean
  SORT: number
}

export interface iBXRestBlogPostEssenceHttp extends iBXRestBlogPostEssenceBase {
  EDIT_IN_LIST: iBXRestYesNo
  ID: string
  IS_SEARCHABLE: iBXRestYesNo
  MANDATORY: iBXRestYesNo
  MULTIPLE: iBXRestYesNo
  SHOW_FILTER: iBXRestYesNo
  SHOW_IN_LIST: iBXRestYesNo
  SORT: string
}

export interface iBXRestBlogPostEssenceBase {
  EDIT_FORM_LABEL: string
  ENTITY_ID: string
  ENTITY_VALUE_ID: number
  ERROR_MESSAGE: null // ???
  FIELD_NAME: string
  HELP_MESSAGE: null // ???
  LIST_COLUMN_LABEL: null // ???
  LIST_FILTER_LABEL: null // ???
  SETTINGS: {
    SIZE: 20,
    MIN_VALUE: 0,
    MAX_VALUE: 0,
    DEFAULT_VALUE: 0
  }
  USER_TYPE: {
    BASE_TYPE: 'int'
    CLASS_NAME: string
    DESCRIPTION: string
    EDIT_CALLBACK: string[]
    USER_TYPE_ID: 'integer'
    USE_FIELD_COMPONENT: boolean
    VIEW_CALLBACK:  string[]
    VALUE: boolean,
    XML_ID: null // ???
  }
  USER_TYPE_ID: 'integer'
  VALUE: boolean
  XML_ID: null // ??
}

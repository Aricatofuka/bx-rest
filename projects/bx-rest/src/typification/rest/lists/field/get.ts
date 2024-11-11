import { iBXRestYesNo } from '../../base/YesNo'
import { iBXRestPagination } from '../../base/ApiPaginationBX'

export interface iBXRestParamListField extends iBXRestPagination {
  IBLOCK_TYPE_ID: 'lists' | 'bitrix_processes' | 'lists_socnet' // id типа инфоблока:
  // lists - тип инфоблока списка
  // bitrix_processes - тип инфоблока процессов
  // lists_socnet - тип инфоблока списков групп
  IBLOCK_CODE?: string // код инфоблока
  IBLOCK_ID?: number, // id инфоблока
  FIELD_ID?: number, // id поля
  SOCNET_GROUP_ID?: number,	// id группы, обязателен, если список находится в группах
}

export interface iBXRestFieldItem {
  FIELD_ID: string
  SORT: number
  NAME: string
  IS_REQUIRED: iBXRestYesNo
  MULTIPLE: iBXRestYesNo
  DEFAULT_VALUE: any,
  TYPE: 'L' | 'F' | 'S:Date' | 'PREVIEW_TEXT' | string
  PROPERTY_TYPE: string | boolean
  PROPERTY_USER_TYPE: boolean | any
  CODE?: string | null
  SETTINGS: {
    SHOW_ADD_FORM: iBXRestYesNo
    SHOW_EDIT_FORM: iBXRestYesNo
    USE_EDITOR?: iBXRestYesNo
    WIDTH?: number
    HEIGHT?: number
    ADD_READ_ONLY_FIELD?: null | string
    EDIT_READ_ONLY_FIELD?: null | string
    SHOW_FIELD_PREVIEW: null | string
  },
  IBLOCK_ID: number,
  DISPLAY_VALUES_FORM?: {
    [key: number]: string
  }
}

export type BXRestHttpListsFieldGet = { [key: string]: iBXRestFieldItem }

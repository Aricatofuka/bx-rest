import { iBXRestPagination } from '../base/ApiPaginationBX'
import { iBXRestYesNo } from '../base/YesNo';

export interface iBXRestParamListGet extends iBXRestPagination {
  IBLOCK_TYPE_ID: 'lists' | 'bitrix_processes' | 'lists_socnet' // id типа инфоблока:
  // lists - тип инфоблока списка
  // bitrix_processes - тип инфоблока процессов
  // lists_socnet - тип инфоблока списков групп
  IBLOCK_CODE?: string // код инфоблока
  IBLOCK_ID?: number, // id инфоблока
  SOCNET_GROUP_ID?: number,	// id группы, обязателен, если список находится в группах
  IBLOCK_ORDER?: any	// TODO: описать подробнее
  // Сортировка. Массив полей разделов информационного блока. Направление сортировки: asc (по возрастания) или desc (по убыванию) Пример:
  // 'IBLOCK_ORDER': { "ID": "DESC" }
}

export interface iBXRestListItem extends iBXRestBaseListItem {
  ACTIVE: boolean
  API_CODE: string
  BIZPROC: boolean
  CANONICAL_PAGE_URL: string
  DESCRIPTION: string
  DETAIL_PAGE_URL: string
  EDIT_FILE_AFTER: string
  EDIT_FILE_BEFORE: string
  ID: number
  INDEX_ELEMENT: boolean
  INDEX_SECTION: boolean
  LAST_CONV_ELEMENT: number
  LIST_MODE: string
  LIST_PAGE_URL: string
  PICTURE: string
  PROPERTY_INDEX: string
  REST_ON: boolean
  RSS_ACTIVE: boolean
  RSS_FILE_ACTIVE: boolean
  RSS_FILE_DAYS: string
  RSS_FILE_LIMIT: string
  RSS_TTL: number
  RSS_YANDEX_ACTIVE: boolean
  SECTION_PAGE_URL: string
  SECTION_PROPERTY: string
  SERVER_NAME: string
  SOCNET_GROUP_ID: string
  TIMESTAMP_X: Date
  TMP_ID: string
  VERSION: number
  WORKFLOW: boolean
  XML_ID: string
  SORT: number
}

export interface iBXRestListItemHttp extends iBXRestBaseListItem{
  ACTIVE: iBXRestYesNo
  API_CODE: string | null
  BIZPROC: iBXRestYesNo
  CANONICAL_PAGE_URL: string | null
  DESCRIPTION: string | null
  DETAIL_PAGE_URL: string | null
  EDIT_FILE_AFTER: string | null
  EDIT_FILE_BEFORE: string | null
  ID: string
  INDEX_ELEMENT: iBXRestYesNo
  INDEX_SECTION: iBXRestYesNo
  LAST_CONV_ELEMENT: string
  LIST_MODE: string | null
  LIST_PAGE_URL: string | null
  PICTURE: string | null
  PROPERTY_INDEX: string | null
  REST_ON: iBXRestYesNo
  RSS_ACTIVE: iBXRestYesNo
  RSS_FILE_ACTIVE: iBXRestYesNo
  RSS_FILE_DAYS: string | null
  RSS_FILE_LIMIT: string | null
  RSS_TTL: string
  RSS_YANDEX_ACTIVE: iBXRestYesNo
  SECTION_PAGE_URL: string | null
  SECTION_PROPERTY: string | null
  SERVER_NAME: string | null
  SOCNET_GROUP_ID: string | null
  TIMESTAMP_X: string
  TMP_ID: string | null
  VERSION: string
  WORKFLOW: iBXRestYesNo
  XML_ID: string | null
  SORT: string
}

interface iBXRestBaseListItem {
  CODE: string
  DESCRIPTION_TYPE: 'text' // TODO: проверить возможно есть другие типы (на 11.11.2022 не видел ни одного)
  ELEMENTS_NAME: string
  ELEMENT_NAME: string
  EXTERNAL_ID: string | null
  IBLOCK_TYPE_ID: string
  LANG_DIR: string
  LID: string
  NAME: string
  RIGHTS_MODE: string
  SECTIONS_NAME: string
  SECTION_CHOOSER: string
  SECTION_NAME: string
}

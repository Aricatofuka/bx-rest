import { iBXRestYesNo } from '../../base/yes-no'
import { iBXRestFilterKeys } from '../../base/filter-generator'
import { iBXRestPagination } from '../../base/api-pagination-bx'

export interface iBXRestParamListsElementGet extends iBXRestPagination{
  IBLOCK_TYPE_ID: 'lists' | 'bitrix_processes' | 'lists_socnet'
  IBLOCK_ID: number
  SOCNET_GROUP_ID?: number
  ELEMENT_ID?: number
  FILTER?: Record<string, any>
}

export type iBXRestListsElementKey = keyof iBXRestListsElement

export interface iBXRestListsElement extends iBXRestBaseListsElement {
  BP_PUBLISHED: boolean
  CREATED_BY: number
  IBLOCK_ID: number
  ID: number
}

export interface iBXRestHttpListsElement extends iBXRestBaseListsElement {
  BP_PUBLISHED: iBXRestYesNo
  CREATED_BY: string
  IBLOCK_ID: string
  ID: string
}

export interface iBXRestBaseListsElement {
  CODE: string | null
  IBLOCK_SECTION_ID: string | null
  NAME: string
  [key: `${iBXRestFilterKeys}PROPERTY_${string}`]: Record<string, string | iBXRestParamListsElementGetHtml>
}

export interface iBXRestParamListsElementGetHtml {
  TYPE: 'HTML',
  TEXT: string
}

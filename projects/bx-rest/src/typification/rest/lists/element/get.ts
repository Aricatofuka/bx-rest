import { iBXRestYesNo } from '../../base/YesNo'
import { iBXRestFilterKeys } from '../../base/filterGenerator'
import { iBXRestPagination } from '../../base/ApiPaginationBX'

export interface iBXRestParamListsElementGet extends iBXRestPagination{
  IBLOCK_TYPE_ID: 'lists' | 'bitrix_processes' | 'lists_socnet'
  IBLOCK_ID: number
  SOCNET_GROUP_ID?: number
  ELEMENT_ID?: number
  FILTER?: { [key: string]: any }
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
  [key: `${iBXRestFilterKeys}PROPERTY_${string}`]: { [key: string]: string | iBXRestParamListsElementGetHtml }
}

export interface iBXRestParamListsElementGetHtml {
  TYPE: 'HTML',
  TEXT: string
}

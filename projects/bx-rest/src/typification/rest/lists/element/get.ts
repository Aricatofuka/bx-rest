import { iBXRestYesNo } from '../../base/YesNo'

export interface iBXRestParamListsElementGet {
  IBLOCK_TYPE_ID: 'lists' | 'bitrix_processes' | 'lists_socnet'
  IBLOCK_ID: number
  SOCNET_GROUP_ID?: number
  ELEMENT_ID?: number
  FILTER?: { [key: string]: any }
}

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
  [key: string]: any // TODO: описать все варианты
}

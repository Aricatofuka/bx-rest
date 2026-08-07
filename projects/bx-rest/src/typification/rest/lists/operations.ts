import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestYesNo } from '../base/yes-no'

export type iBXRestListsIBlockType = 'lists' | 'bitrix_processes' | 'lists_socnet'
export type iBXRestListsPermission = 'D' | 'R' | 'E' | 'S' | 'T' | 'U' | 'W' | 'X'
export interface iBXRestListsFile {
  fileData: [name: string, content: string]
}

export interface iBXRestListsFields {
  NAME: string
  DESCRIPTION?: string
  SORT?: number
  PICTURE?: iBXRestListsFile
  BIZPROC?: iBXRestYesNo
}

export interface iBXRestParamListsAdd {
  IBLOCK_TYPE_ID: iBXRestListsIBlockType
  IBLOCK_CODE: string
  SOCNET_GROUP_ID?: number
  FIELDS: iBXRestListsFields
  MESSAGES?: Record<string, string>
  RIGHTS?: Record<string, iBXRestListsPermission>
}

export type iBXRestListsIBlockLocator = {
  IBLOCK_TYPE_ID: iBXRestListsIBlockType
} & (
  | {IBLOCK_ID: number; IBLOCK_CODE?: string}
  | {IBLOCK_ID?: number; IBLOCK_CODE: string}
)

export type iBXRestParamListsDelete = iBXRestListsIBlockLocator

export type iBXRestParamListsUpdate = iBXRestListsIBlockLocator & {
  SOCNET_GROUP_ID?: number
  FIELDS: iBXRestListsFields
  MESSAGES?: Record<string, string>
  RIGHTS?: Record<string, iBXRestListsPermission>
}

export type iBXRestParamListsGetIBlockTypeId =
  | {IBLOCK_ID: number; IBLOCK_CODE?: string}
  | {IBLOCK_ID?: number; IBLOCK_CODE: string}

export type iBXRestListsElementLocator =
  | {ELEMENT_ID: number; ELEMENT_CODE?: string}
  | {ELEMENT_ID?: number; ELEMENT_CODE: string}

export type iBXRestParamListsElementDelete =
  iBXRestListsIBlockLocator & iBXRestListsElementLocator

export type iBXRestParamListsElementUpdate =
  iBXRestListsIBlockLocator & iBXRestListsElementLocator & {
    FIELDS: {NAME: string; [field: string]: unknown}
  }

export type iBXRestParamListsElementGetFileUrl =
  iBXRestListsIBlockLocator & iBXRestListsElementLocator & {
    FIELD_ID: number
  }

export type iBXRestListsFieldType =
  | 'S' | 'N' | 'L' | 'F' | 'G' | 'E'
  | 'S:Date' | 'S:DateTime' | 'S:HTML' | 'E:EList'
  | 'N:Sequence' | 'S:ECrm' | 'S:Money' | 'S:DiskFile' | 'S:employee'
  | string

export interface iBXRestListsFieldDefinition {
  NAME: string
  TYPE: iBXRestListsFieldType
  IS_REQUIRED?: iBXRestYesNo
  MULTIPLE?: iBXRestYesNo
  SORT?: number
  DEFAULT_VALUE?: unknown
  LIST?: Record<string, string>
  CODE?: string
  SETTINGS?: Record<string, unknown>
}

export type iBXRestParamListsFieldAdd = iBXRestListsIBlockLocator & {
  FIELDS: iBXRestListsFieldDefinition
}

export type iBXRestParamListsFieldDelete = iBXRestListsIBlockLocator & {
  FIELD_ID: string
}

export type iBXRestParamListsFieldUpdate = iBXRestParamListsFieldDelete & {
  FIELDS: iBXRestListsFieldDefinition
}

export type iBXRestParamListsFieldTypeGet = iBXRestListsIBlockLocator & {
  FIELD_ID?: string | number
}

export type iBXRestListsSectionLocator =
  | {SECTION_ID: number; SECTION_CODE?: string}
  | {SECTION_ID?: number; SECTION_CODE: string}

export interface iBXRestListsSectionFields {
  NAME: string
  EXTERNAL_ID?: string
  XML_ID?: string
  SORT?: number
  ACTIVE?: iBXRestYesNo
  PICTURE?: iBXRestListsFile | {remove: 'Y'}
  DESCRIPTION?: string
  DESCRIPTION_TYPE?: 'text' | 'html'
  DETAIL_PICTURE?: iBXRestListsFile | {remove: 'Y'}
  SECTION_PROPERTY?: unknown[]
}

export type iBXRestParamListsSectionAdd = iBXRestListsIBlockLocator & {
  IBLOCK_SECTION_ID?: number
  SECTION_CODE: string
  FIELDS: iBXRestListsSectionFields
}

export type iBXRestParamListsSectionDelete =
  iBXRestListsIBlockLocator & iBXRestListsSectionLocator

export type iBXRestParamListsSectionUpdate =
  iBXRestListsIBlockLocator & iBXRestListsSectionLocator & {
    FIELDS: iBXRestListsSectionFields
  }

export interface iBXRestParamListsSectionGet extends iBXRestPagination {
  IBLOCK_TYPE_ID: iBXRestListsIBlockType
  IBLOCK_ID?: number
  IBLOCK_CODE?: string
  FILTER?: Record<string, unknown>
  SELECT?: string[]
}

export interface iBXRestListsSection {
  ID: string
  CODE: string | null
  XML_ID: string | null
  EXTERNAL_ID: string | null
  IBLOCK_SECTION_ID: string | null
  SORT: string
  NAME: string
  ACTIVE: iBXRestYesNo
  [field: string]: unknown
}

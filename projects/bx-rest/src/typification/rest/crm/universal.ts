import { iBXRestPagination } from '../base/api-pagination-bx'

export type iBXRestCrmObject = Record<string, unknown>
export type iBXRestCrmFields = Record<string, unknown>
export type iBXRestCrmParams = Record<string, unknown>

export interface iBXRestParamCrmEntityType {
  entityTypeId: number
}

export interface iBXRestParamCrmTypeId {
  id: number
}

export interface iBXRestParamCrmTypeAdd {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmTypeUpdate extends iBXRestParamCrmTypeId {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmTypeList extends iBXRestPagination {
  order?: Record<string, 'ASC' | 'DESC'>
  filter?: iBXRestCrmFields
}

export interface iBXRestParamCrmCategoryId extends iBXRestParamCrmEntityType {
  id: number
}

export interface iBXRestParamCrmCategoryAdd extends iBXRestParamCrmEntityType {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmCategoryUpdate extends iBXRestParamCrmCategoryId {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmCategoryList extends iBXRestParamCrmEntityType, iBXRestPagination {
  order?: Record<string, 'ASC' | 'DESC'>
  filter?: iBXRestCrmFields
}

export interface iBXRestParamCrmItemId extends iBXRestParamCrmEntityType {
  id: number
  useOriginalUfNames?: 'Y' | 'N'
}

export interface iBXRestParamCrmItemFields extends iBXRestParamCrmEntityType {
  fields: iBXRestCrmFields
  useOriginalUfNames?: 'Y' | 'N'
}

export interface iBXRestParamCrmItemUpdate extends iBXRestParamCrmItemId {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmItemList extends iBXRestParamCrmEntityType, iBXRestPagination {
  select?: string[]
  filter?: iBXRestCrmFields
  order?: Record<string, 'ASC' | 'DESC'>
  useOriginalUfNames?: 'Y' | 'N'
}

export interface iBXRestParamCrmItemImport extends iBXRestParamCrmEntityType {
  fields: iBXRestCrmFields
}

export interface iBXRestParamCrmItemBatchImport extends iBXRestParamCrmEntityType {
  items: iBXRestCrmFields[]
}

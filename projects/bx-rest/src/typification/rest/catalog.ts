import { iBXRestPagination } from './base/api-pagination-bx'

/** Parameters for catalog methods that read one item by ID. */
export interface iBXRestParamCatalogGet {
  id: number
}

/** Parameters for catalog methods that describe fields based on a filter. */
export interface iBXRestParamCatalogFieldsByFilterFilter extends Record<string, unknown> {
  iblockId: number
}

export interface iBXRestParamCatalogFieldsByFilter {
  filter: iBXRestParamCatalogFieldsByFilterFilter
}

/** Required fields for catalog product-list methods. */
export type iBXRestCatalogRequiredSelect =
  | ['id', 'iblockId', ...string[]]
  | ['iblockId', 'id', ...string[]]

export interface iBXRestParamCatalogProductList
  extends iBXRestPagination, Record<string, unknown> {
  select: iBXRestCatalogRequiredSelect
  filter: Record<string, unknown>
}

export interface iBXRestParamCatalogSectionList
  extends iBXRestPagination, Record<string, unknown> {
  filter: { iblockId: number }
}

export interface iBXRestParamCatalogProductImageList {
  productId: number
}

export interface iBXRestParamCatalogProductPropertySectionGet {
  propertyId: number
}

export interface iBXRestParamCatalogUserFieldDocumentList
  extends iBXRestPagination, Record<string, unknown> {
  select: ['documentType', ...string[]]
  filter: { documentType: string } & Record<string, unknown>
  order?: Record<string, 'ASC' | 'DESC' | 'asc' | 'desc'>
}

/** Parameters for entity-storage methods that are scoped to a storage entity. */
export interface iBXRestParamEntityGet {
  ENTITY: string
}

export interface iBXRestParamEntityItemGet extends iBXRestParamEntityGet {
  SORT?: Record<string, 'ASC' | 'DESC'>
  FILTER?: Record<string, unknown>
  start?: number
}

export interface iBXRestParamEntitySectionGet extends iBXRestParamEntityGet {
  SORT?: Record<string, 'ASC' | 'DESC'>
  FILTER?: Record<string, unknown>
  start?: number
}

export interface iBXRestParamEntityItemPropertyGet extends iBXRestParamEntityGet {
  PROPERTY?: string
}

export interface iBXRestFolderInfo {
  ID: number
  NAME: string
  CODE: null | string
  MODULE_ID: string
  ENTITY_TYPE: string
  ENTITY_ID: string
  ROOT_OBJECT_ID: number
}

export interface iBXRestFolder extends iBXRestFolderOrFile, iBXRestFolderBase {
}

export interface iBXRestFolderHttp extends iBXRestFolderOrFileHttp, iBXRestFolderBase {
}

export interface iBXRestFolderBase extends iBXRestFolderOrFileBase{
  TYPE: 'folder'
}

export interface iBXRestFolderOrFile extends iBXRestFolderOrFileBase {
  CREATED_BY: number
  CREATE_TIME: Date
  DELETED_BY: number
  DELETED_TYPE: number
  DELETE_TIME: null | Date
  ID: number
  PARENT_ID: number
  REAL_OBJECT_ID: number
  STORAGE_ID: number
  UPDATED_BY: number
  UPDATE_TIME: Date
}

export interface iBXRestFolderOrFileHttp extends iBXRestFolderOrFileBase {
  CREATED_BY: string
  CREATE_TIME: string
  DELETED_BY: string
  DELETED_TYPE: string
  DELETE_TIME: null | string
  ID: string
  PARENT_ID: string
  REAL_OBJECT_ID: string
  STORAGE_ID: string
  UPDATED_BY: string
  UPDATE_TIME: string
}

export interface iBXRestFolderOrFileBase {
  CODE: null
  DETAIL_URL: null | string
  NAME: string
}

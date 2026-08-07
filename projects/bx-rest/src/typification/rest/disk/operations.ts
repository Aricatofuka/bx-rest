import { iBXRestPagination } from '../base/api-pagination-bx'
import { iBXRestDiskFileHttp } from './file'
import { iBXRestFolderOrFileHttp } from './folder'

export interface iBXRestParamDiskFileTarget {
  id: number
  targetFolderId: number
}

export interface iBXRestParamDiskFileRename {
  id: number
  newName: string
}

export interface iBXRestParamDiskFileUploadVersion {
  id: number
  fileContent: [name: string, content: string]
}

export interface iBXRestParamDiskFileRestoreFromVersion {
  id: number
  versionId: number
}

export interface iBXRestParamDiskFileGetVersions extends iBXRestPagination {
  id: number
  filter?: Record<string, unknown>
}

export interface iBXRestParamDiskFileSearch extends iBXRestPagination {
  QUERY: string
  TYPE?: 'file' | 'folder'
  FILTER?: {
    STORAGE_ID?: number
    FOLDER_ID?: number
  }
}

export interface iBXRestDiskVersion {
  ID: string
  OBJECT_ID: string
  SIZE: string
  NAME: string
  GLOBAL_CONTENT_VERSION: string
  CREATE_TIME: string
  CREATED_BY: string
  DOWNLOAD_URL: string
}

export interface iBXRestParamDiskVersionGet {
  id: number
}

export interface iBXRestDiskAccessTask {
  ID: string
  NAME: 'disk_access_read' | 'disk_access_add' | 'disk_access_edit' | 'disk_access_full' | string
  TITLE: string
}

export interface iBXRestParamDiskFolderShareToUser {
  id: number
  userId: number
  taskName: 'disk_access_read' | 'disk_access_add' | 'disk_access_edit' | 'disk_access_full'
}

export type iBXRestDiskFileSearchResult = iBXRestFolderOrFileHttp
export type iBXRestDiskFileOperationResult = iBXRestDiskFileHttp

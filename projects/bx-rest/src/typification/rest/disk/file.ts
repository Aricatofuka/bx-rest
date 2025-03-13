import { iBXRestFolderOrFile, iBXRestFolderOrFileBase } from './folder'

export type iBXRestParamDiskFileMarkDeleted = iBXRestParamDiskFile

export type iBXRestParamDiskFileGet = iBXRestParamDiskFile

export interface iBXRestParamDiskFile {
  id: number
}

export interface iBXRestDiskFile extends iBXRestFolderOrFile, iBXRestDiskFileBase {
  SIZE: number
  FILE_ID: number
}

export interface iBXRestDiskFileHttp extends iBXRestFolderOrFile, iBXRestDiskFileBase {
  SIZE: string
  FILE_ID: string
}

export interface iBXRestDiskFileBase extends iBXRestFolderOrFileBase{
  DOWNLOAD_URL: string
  GLOBAL_CONTENT_VERSION: number
  TYPE: 'file'
}

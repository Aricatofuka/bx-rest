import { iBXRestFolderOrFile, iBXRestFolderOrFileBase } from './folder'

export interface iBXRestParamDiskFileMarkDeleted extends iBXRestParamDiskFile{

}

export interface iBXRestParamDiskFileGet extends iBXRestParamDiskFile{

}

export interface iBXRestParamDiskFile {
  id: number
}

export interface iBXRestDiskFile extends iBXRestFolderOrFile, iBXRestDiskFileBase {
  SIZE: number
}

export interface iBXRestDiskFileHttp extends iBXRestFolderOrFile, iBXRestDiskFileBase {
  SIZE: string
}

export interface iBXRestDiskFileBase extends iBXRestFolderOrFileBase{
  DOWNLOAD_URL: string
  FILE_ID: number,
  GLOBAL_CONTENT_VERSION: number
  TYPE: 'file'
}

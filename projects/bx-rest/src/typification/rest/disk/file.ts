import { iBXRestFolderOrFile, iBXRestFolderOrFileBase } from './folder';


export interface iBXRestFile extends iBXRestFolderOrFile, iBXRestFileBase {
  DOWNLOAD_URL: string
  SIZE: number
}

export interface iBXRestFileHttp extends iBXRestFolderOrFile, iBXRestFileBase {
  DOWNLOAD_URL: string
  SIZE: string
}

export interface iBXRestFileBase extends iBXRestFolderOrFileBase{
  FILE_ID: number,
  GLOBAL_CONTENT_VERSION: number
  TYPE: 'file'
}

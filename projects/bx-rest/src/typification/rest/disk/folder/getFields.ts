import { iBXRestFolder } from '../folder'

export type iBXRestDiskFolderGetFieldsHttp = {[key in keyof iBXRestFolder]: iBXRestDiskFolderGetFieldsHttpElement}

export interface iBXRestDiskFolderGetFieldsHttpElement {
  TYPE: 'integer' | 'string' | 'enum' | 'datetime'
  USE_IN_FILTER: boolean
  USE_IN_SHOW: boolean
}

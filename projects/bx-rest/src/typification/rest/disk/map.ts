import { iBXRestFolder } from './folder'
import { iBXRestDiskFile } from './file'

export interface iBXRestDiskFileAndFolderMap {
  file: iBXRestDiskFile[],
  folder: iBXRestFolder[]
}

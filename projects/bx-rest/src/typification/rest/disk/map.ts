import { iBXRestFolder } from './folder'
import { iBXRestFile } from './file'

export interface iBXRestFileAndFolderMap {
  file: iBXRestFile[],
  folder: iBXRestFolder[]
}

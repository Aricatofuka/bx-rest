import { iBXRestDiskFile, iBXRestDiskFileHttp } from '../../typification/rest/disk/file'
import { toNum } from '../../services/base'

export class BXRestMapDiskFile {

  get(v: iBXRestDiskFileHttp | undefined): iBXRestDiskFile | undefined {
    return (v) ? Object.assign(v, {SIZE: toNum(v.SIZE)}) : undefined
  }

  markdeleted(v: iBXRestDiskFileHttp | undefined): iBXRestDiskFile | undefined {
    return (v) ? Object.assign(v, {SIZE: toNum(v.SIZE)}) : undefined
  }
}

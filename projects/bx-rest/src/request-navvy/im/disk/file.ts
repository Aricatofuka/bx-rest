import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImDiskFileCommit, iBXRestParamImDiskFileDelete, iBXRestParamImDiskFileSave } from '../../../typification/rest/im'
import { $commit, $delete, $disk, $file, $im, $save } from '../../../consts/part-name-methods'

export class BXRestNavvyImDiskFile {
  private readonly Navvy = new Navvy()

  commit(param: iBXRestParamImDiskFileCommit) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImDiskFileCommit
    >([$im, $disk, $file, $commit], param)
  }

  delete(param: iBXRestParamImDiskFileDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImDiskFileDelete>(
      [$im, $disk, $file, $delete],
      param
    )
  }

  save(param: iBXRestParamImDiskFileSave) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImDiskFileSave
    >([$im, $disk, $file, $save], param)
  }
}


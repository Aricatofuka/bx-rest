import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImDiskFileCommit, iBXRestParamImDiskFileDelete, iBXRestParamImDiskFileSave } from '../../../typification/rest/im'
import { $commit, $delete, $disk, $file, $im, $save } from '../../../consts/part-name-methods'

export class BXRestNavvyImDiskFile {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет файл в чат (устаревший метод).
   */
  commit(param: iBXRestParamImDiskFileCommit) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImDiskFileCommit
    >([$im, $disk, $file, $commit], param)
  }

  /**
   * Удаляет файл из папки чата.
   */
  delete(param: iBXRestParamImDiskFileDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImDiskFileDelete>(
      [$im, $disk, $file, $delete],
      param
    )
  }

  /**
   * Сохраняет файл чата на Диск.
   */
  save(param: iBXRestParamImDiskFileSave) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImDiskFileSave
    >([$im, $disk, $file, $save], param)
  }
}


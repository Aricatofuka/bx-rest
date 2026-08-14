import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImDiskFolderGet } from '../../../typification/rest/im'
import { $disk, $folder, $get, $im } from '../../../consts/part-name-methods'

export class BXRestNavvyImDiskFolder {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает папку файлового хранилища чата (устаревший метод).
   */
  get(param: iBXRestParamImDiskFolderGet) {
    return this.Navvy.simple<
      iBXRestImObject,
      iBXRestImObject,
      iBXRestParamImDiskFolderGet
    >([$im, $disk, $folder, $get], param)
  }
}


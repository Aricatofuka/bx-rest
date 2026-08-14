import { $disk, $get, $version } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestDiskVersion,
  iBXRestParamDiskVersionGet
} from '../../typification/rest/disk'

export class BXRestNavvyDiskVersion {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$disk, $version, $get]
  }

  /**
   * Возвращает версию файла по идентификатору.
   */
  get(param: iBXRestParamDiskVersionGet) {
    return this.Navvy.simple<
      iBXRestDiskVersion,
      iBXRestDiskVersion,
      iBXRestParamDiskVersionGet
    >(this.url.get, param)
  }
}

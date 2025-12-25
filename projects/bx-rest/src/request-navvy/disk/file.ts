import { Navvy } from '../../services/navvy'
import { BXRestMapDiskFile } from '../../map/disk/file'
import { iBXRestParamDiskFileGet, iBXRestParamDiskFileMarkDeleted } from '../../typification/rest/disk'
import { $disk, $file, $get, $markdeleted } from '../../consts/part-name-methods'

export class BXRestNavvyDiskFile {
  url = {
    // /**
    //  * Возвращает описание полей файла
    //  */
    // getFields: [$disk, $file, $getFields],
    /**
     * Возвращает файл по идентификатору
     */
    get: [$disk, $file, $get], //
    // /**
    //  * Переименовывает файл
    //  */
    // rename: [$disk, $file, $rename],
    // /**
    //  * Копирует файл в указанную папку
    //  */
    // copyTo: [$disk, $file, $copyto],
    // /**
    //  * Перемещает файл в указанную папку
    //  */
    // moveto: [$disk, $file, $moveto],
    // /**
    //  * Уничтожает файл навсегда
    //  */
    // delete: [$disk, $file, $delete],
    /**
     * Перемещает файл в корзину
     */
    markDeleted: [$disk, $file, $markdeleted],
    // /**
    //  * Восстанавливает файл из корзины
    //  */
    // restore: [$disk, $file, $restore],
    // /**
    //  * Загружает новую версию файла
    //  */
    // uploadVersion: [$disk, $file, 'uploadversion'],
    // /**
    //  * Возвращает список версий файла
    //  */
    // getVersions: [$disk, $file, 'getVersions'],
    // /**
    //  * Восстанавливает файл из конкретной версии
    //  */
    // restoreFromVersion: [$disk, $file, 'restoreFromVersion'],
    // /**
    //  * Возвращает публичную ссылку на файл
    //  */
    // getExternalLink: [$disk, $file, 'getexternallink']
  }

  private Navvy = new Navvy()

  get(param: iBXRestParamDiskFileGet) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapDiskFile.get
    )
  }

  markDeleted(param: iBXRestParamDiskFileMarkDeleted) {
    return this.Navvy.simple(
      this.url.markDeleted,
      param,
      BXRestMapDiskFile.get
    )
  }
}

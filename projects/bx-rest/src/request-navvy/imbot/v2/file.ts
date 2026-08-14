import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $File, $download, $imbot, $upload, $v2 } from '../../../consts/part-name-methods'

export class BXRestNavvyImBotV2File  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает ссылку для скачивания файла.
   */
  download(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $File, $download], param)
  }

  /**
   * Загружает файл в чат.
   */
  upload(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imbot, $v2, $File, $upload], param)
  }
}


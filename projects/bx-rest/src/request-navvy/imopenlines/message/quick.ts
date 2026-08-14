import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $imopenlines, $message, $quick, $save } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesMessageQuick  {
  private readonly Navvy = new Navvy()

  /**
   * Сохраняет сообщение как быстрый ответ.
   */
  save(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $message, $quick, $save], param)
  }
}


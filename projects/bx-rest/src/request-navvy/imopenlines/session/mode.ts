import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $imopenlines, $mode, $pin, $pinAll, $session, $silent, $unpinAll } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesSessionMode  {
  private readonly Navvy = new Navvy()

  /**
   * Закрепляет или открепляет выбранный диалог.
   */
  pin(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $pin], param)
  }

  /**
   * Закрепляет все доступные диалоги за оператором.
   */
  pinAll(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $pinAll], param)
  }

  /**
   * Включает или выключает скрытый режим диалога.
   */
  silent(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $silent], param)
  }

  /**
   * Открепляет все закреплённые диалоги оператора.
   */
  unpinAll(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $session, $mode, $unpinAll], param)
  }
}


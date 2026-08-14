import { Navvy } from '../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../typification/rest/common'
import { $add, $crm, $imopenlines, $message } from '../../../consts/part-name-methods'

export class BXRestNavvyImOpenLinesCrmMessage  {
  private readonly Navvy = new Navvy()

  /**
   * Отправляет сообщение в открытую линию.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$imopenlines, $crm, $message, $add], param)
  }
}


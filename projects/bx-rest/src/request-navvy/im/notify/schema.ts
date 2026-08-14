import { Navvy } from '../../../services/navvy'
import { iBXRestImObject } from '../../../typification/rest/im'
import { $get, $im, $notify, $schema } from '../../../consts/part-name-methods'

export class BXRestNavvyImNotifySchema {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает схему типов уведомлений.
   */
  get() {
    return this.Navvy.simple<iBXRestImObject[]>([$im, $notify, $schema, $get])
  }
}


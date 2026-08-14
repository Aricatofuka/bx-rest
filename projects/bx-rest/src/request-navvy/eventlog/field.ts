import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $eventlog, $field, $get, $list, $main } from '../../consts/part-name-methods'

export class BXRestNavvyEventLogField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля записи журнала событий по имени.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $field, $get], param)
  }
  /**
   * Возвращает список полей записи журнала событий.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $field, $list], param)
  }
}


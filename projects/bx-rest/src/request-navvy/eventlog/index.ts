import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $eventlog, $get, $list, $main, $tail } from '../../consts/part-name-methods'
import { BXRestNavvyEventLogField } from './field'

export class BXRestNavvyEventLog  {
  private readonly Navvy = new Navvy()

  /**
   * Поля записи журнала событий (`main.eventlog.field.*`).
   */
  public readonly field = new BXRestNavvyEventLogField()
  /**
   * Возвращает запись журнала событий по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $get], param)
  }
  /**
   * Возвращает список записей журнала событий по фильтру.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $list], param)
  }
  /**
   * Возвращает новые записи журнала событий после точки отсчёта.
   */
  public tail(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $tail], param)
  }
}


import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $eventlog, $get, $list, $main, $tail } from '../../consts/part-name-methods'
import { restV3PageNav } from '../../services/navvy/sequential-navs'
import { EVENTLOG_TIMEMAN_MAX_PAGE_SIZE, PAGE_SIZE } from '../../consts/page-size'
import { BXRestNavvyEventLogField } from './field'

export class BXRestNavvyEventLog  {
  private readonly Navvy = new Navvy()

  /**
   * Поля записи журнала событий (`main.eventlog.field.*`).
   */
  public readonly field = new BXRestNavvyEventLogField()
  /**
   * Возвращает запись журнала событий по идентификатору
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $get], param)
  }
  /**
   * Возвращает список записей журнала событий по фильтру
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavSequentialV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $list], param, restV3PageNav(PAGE_SIZE, EVENTLOG_TIMEMAN_MAX_PAGE_SIZE))
  }
  /**
   * Возвращает новые записи журнала событий после точки отсчёта
   */
  public tail(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $tail], param)
  }
}

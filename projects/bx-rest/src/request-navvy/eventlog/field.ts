import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { iBXRestParamEventLogFieldGet } from '../../typification/rest/eventlog'
import { $eventlog, $field, $get, $list, $main } from '../../consts/part-name-methods'

export class BXRestNavvyEventLogField  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает описание поля записи журнала событий по имени
   * @see https://apidocs.bitrix24.ru/api-reference/event-log/main-eventlog-field-get.html
   */
  public get(param: iBXRestParamEventLogFieldGet) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestParamEventLogFieldGet
    >([$main, $eventlog, $field, $get], param)
  }
  /**
   * Возвращает список полей записи журнала событий
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simpleV3<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $field, $list], param)
  }
}

import { Navvy } from '../../services/navvy'
import { iBXRestParamTimemanScheduleGet, iBXRestTimemanObject } from '../../typification/rest/timeman'
import { $get, $schedule, $timeMan } from '../../consts/part-name-methods'

export class BXRestNavvyTimemanSchedule {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает рабочий график по идентификатору.
   */
  get(param: iBXRestParamTimemanScheduleGet = {}) {
    return this.Navvy.simple<
      iBXRestTimemanObject,
      iBXRestTimemanObject,
      iBXRestParamTimemanScheduleGet
    >([$timeMan, $schedule, $get], param)
  }
}


import { $accessibility, $calendar, $get } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestCalendarAccessibility,
  iBXRestParamCalendarAccessibilityGet
} from '../../typification/rest/calendar'

/** User availability (`calendar.accessibility.*`). */
export class BXRestNavvyCalendarAccessibility {
  private readonly Navvy = new Navvy()
  private readonly url = {
    get: [$calendar, $accessibility, $get]
  }

  /** Returns busy intervals for the requested users and period. */
  get(param: iBXRestParamCalendarAccessibilityGet) {
    return this.Navvy.simple<
      iBXRestCalendarAccessibility,
      iBXRestCalendarAccessibility,
      iBXRestParamCalendarAccessibilityGet
    >(this.url.get, param)
  }
}

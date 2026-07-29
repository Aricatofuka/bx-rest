import {
  $crm,
  $item,
  $pin,
  $timeline,
  $unpin
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import { iBXRestParamCrmTimelineItemPin } from '../../../typification/rest/crm'

/** Действия над записями таймлайна (`crm.timeline.item.*`). */
export class BXRestNavvyCrmTimelineItem {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Закрепляет запись в таймлайне элемента CRM. */
    pin: [$crm, $timeline, $item, $pin],
    /** Открепляет запись в таймлайне элемента CRM. */
    unpin: [$crm, $timeline, $item, $unpin]
  }

  /**
   * Закрепляет запись в таймлайне указанного элемента CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/timeline-item/crm-timeline-item-pin.html
   */
  pin(param: iBXRestParamCrmTimelineItemPin) {
    return this.Navvy.simple<null, null, iBXRestParamCrmTimelineItemPin>(
      this.url.pin,
      param
    )
  }

  /**
   * Открепляет запись в таймлайне указанного элемента CRM.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/timeline-item/crm-timeline-item-unpin.html
   */
  unpin(param: iBXRestParamCrmTimelineItemPin) {
    return this.Navvy.simple<null, null, iBXRestParamCrmTimelineItemPin>(
      this.url.unpin,
      param
    )
  }
}

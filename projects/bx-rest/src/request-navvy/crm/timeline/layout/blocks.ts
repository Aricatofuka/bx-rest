import {
  $blocks,
  $crm,
  $delete,
  $get,
  $layout,
  $set,
  $timeline
} from '../../../../consts/part-name-methods'
import { Navvy } from '../../../../services/navvy'
import {
  iBXRestCrmTimelineLayoutResult,
  iBXRestCrmTimelineSuccessResult,
  iBXRestParamCrmTimelineLayoutBlocks,
  iBXRestParamCrmTimelineLayoutBlocksSet
} from '../../../../typification/rest/crm'

/** Дополнительные контентные блоки записи таймлайна (`crm.timeline.layout.blocks.*`). */
export class BXRestNavvyCrmTimelineLayoutBlocks {
  private readonly Navvy = new Navvy()

  readonly url = {
    /** Устанавливает полный набор блоков текущего приложения. */
    set: [$crm, $timeline, $layout, $blocks, $set],
    /** Возвращает набор блоков текущего приложения. */
    get: [$crm, $timeline, $layout, $blocks, $get],
    /** Удаляет набор блоков текущего приложения. */
    delete: [$crm, $timeline, $layout, $blocks, $delete]
  }

  /**
   * Устанавливает набор дополнительных контентных блоков в запись таймлайна.
   *
   * Новый вызов полностью заменяет набор, ранее установленный тем же приложением.
   * Метод доступен администратору и не применяется к делам, лог-записям и
   * устаревшим типам записей таймлайна.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/layout/blocks/crm-timeline-layout-blocks-set.html
   */
  set(param: iBXRestParamCrmTimelineLayoutBlocksSet) {
    return this.Navvy.simple<
      iBXRestCrmTimelineSuccessResult | null,
      iBXRestCrmTimelineSuccessResult | null,
      iBXRestParamCrmTimelineLayoutBlocksSet
    >(this.url.set, param)
  }

  /**
   * Возвращает набор дополнительных контентных блоков, установленный текущим приложением.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/layout/blocks/crm-timeline-layout-blocks-get.html
   */
  get(param: iBXRestParamCrmTimelineLayoutBlocks) {
    return this.Navvy.simple<
      iBXRestCrmTimelineLayoutResult,
      iBXRestCrmTimelineLayoutResult,
      iBXRestParamCrmTimelineLayoutBlocks
    >(this.url.get, param)
  }

  /**
   * Удаляет набор дополнительных контентных блоков текущего приложения.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/timeline/layout/blocks/crm-timeline-layout-blocks-delete.html
   */
  delete(param: iBXRestParamCrmTimelineLayoutBlocks) {
    return this.Navvy.simple<
      iBXRestCrmTimelineSuccessResult | null,
      iBXRestCrmTimelineSuccessResult | null,
      iBXRestParamCrmTimelineLayoutBlocks
    >(this.url.delete, param)
  }
}

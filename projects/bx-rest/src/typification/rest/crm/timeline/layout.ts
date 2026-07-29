/** Один дополнительный контентный блок записи таймлайна. */
export interface iBXRestCrmTimelineLayoutBlock {
  /** Тип блока, например `text`, `largeText`, `link` или `withTitle`. */
  type: string
  /** Свойства блока. Их состав зависит от значения `type`. */
  properties: Record<string, unknown>
}

/** Набор дополнительных контентных блоков, установленный приложением. */
export interface iBXRestCrmTimelineLayout {
  /**
   * Блоки, индексированные произвольными уникальными ключами приложения.
   *
   * При повторном вызове `set` весь набор этого приложения заменяется.
   */
  blocks: Record<string, iBXRestCrmTimelineLayoutBlock>
}

/** Адрес записи таймлайна для методов `crm.timeline.layout.blocks.*`. */
export interface iBXRestParamCrmTimelineLayoutBlocks {
  /** Идентификатор типа CRM-объекта. */
  entityTypeId: number
  /** Идентификатор CRM-элемента. */
  entityId: number
  /** Идентификатор записи таймлайна. */
  timelineId: number
}

/** Параметры установки дополнительных контентных блоков. */
export interface iBXRestParamCrmTimelineLayoutBlocksSet
  extends iBXRestParamCrmTimelineLayoutBlocks {
  /** Новый полный набор блоков приложения. */
  layout: iBXRestCrmTimelineLayout
}

/** Результат чтения дополнительных контентных блоков. */
export interface iBXRestCrmTimelineLayoutResult {
  layout: iBXRestCrmTimelineLayout
}

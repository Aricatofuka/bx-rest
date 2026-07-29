/** Параметры закрепления или открепления записи таймлайна. */
export interface iBXRestParamCrmTimelineItemPin {
  /** Идентификатор записи таймлайна. */
  id: number
  /** Идентификатор типа связанного объекта CRM, например `2` для сделки. */
  ownerTypeId: number
  /** Идентификатор связанного элемента CRM. */
  ownerId: number
}

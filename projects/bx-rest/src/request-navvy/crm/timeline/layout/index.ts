import { BXRestNavvyCrmTimelineLayoutBlocks } from './blocks'

export * from './blocks'

/** Визуальное расширение записей таймлайна (`crm.timeline.layout.*`). */
export class BXRestNavvyCrmTimelineLayout {
  /** Дополнительные контентные блоки записи. */
  public readonly blocks = new BXRestNavvyCrmTimelineLayoutBlocks()
}

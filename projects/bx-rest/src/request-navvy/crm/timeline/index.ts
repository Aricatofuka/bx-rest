import { BXRestNavvyCrmTimelineBindings } from './bindings'
import { BXRestNavvyCrmTimelineComment } from './comment'
import { BXRestNavvyCrmTimelineIcon } from './icon'
import { BXRestNavvyCrmTimelineItem } from './item'
import { BXRestNavvyCrmTimelineLayout } from './layout'
import { BXRestNavvyCrmTimelineLogMessage } from './logmessage'
import { BXRestNavvyCrmTimelineLogo } from './logo'
import { BXRestNavvyCrmTimelineNote } from './note'

export * from './bindings'
export * from './comment'
export * from './icon'
export * from './item'
export * from './layout'
export * from './logmessage'
export * from './logo'
export * from './note'

/** Таймлайн CRM: комментарии, заметки, связи и лог-записи (`crm.timeline.*`). */
export class BXRestNavvyCrmTimeline {
  /** Комментарии таймлайна. */
  public readonly comment = new BXRestNavvyCrmTimelineComment()
  /** Заметки к записям таймлайна и делам. */
  public readonly note = new BXRestNavvyCrmTimelineNote()
  /** Связи записей таймлайна с элементами CRM. */
  public readonly bindings = new BXRestNavvyCrmTimelineBindings()
  /** Дополнительные контентные блоки записей. */
  public readonly layout = new BXRestNavvyCrmTimelineLayout()
  /** Лог-записи приложения. */
  public readonly logMessage = new BXRestNavvyCrmTimelineLogMessage()
  /** Иконки лог-записей. */
  public readonly icon = new BXRestNavvyCrmTimelineIcon()
  /** Логотипы лог-записей. */
  public readonly logo = new BXRestNavvyCrmTimelineLogo()
  /** Закрепление и открепление записей. */
  public readonly item = new BXRestNavvyCrmTimelineItem()
}

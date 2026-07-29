import { iBXRestPagination } from '../../base/api-pagination-bx'
import { iBXRestCrmTimelineSortOrder } from './common'

/** Лог-запись приложения в таймлайне CRM. */
export interface iBXRestCrmTimelineLogMessage {
  /** Идентификатор записи таймлайна. */
  id: number
  /** Дата и время создания в формате ISO 8601. */
  created: string
  /** Идентификатор автора. */
  authorId: number
  /** Заголовок записи. */
  title: string
  /** Текст записи. */
  text: string
  /** Код иконки из `crm.timeline.icon.list`. */
  iconCode: string
}

/** Поля новой лог-записи. */
export interface iBXRestCrmTimelineLogMessageAddFields {
  /** Идентификатор типа CRM-сущности. */
  entityTypeId: number
  /** Идентификатор элемента CRM. */
  entityId: number
  /** Заголовок записи. */
  title: string
  /** Текст записи. */
  text: string
  /** Код иконки из `crm.timeline.icon.list`. */
  iconCode: string
}

/** Параметры добавления лог-записи. */
export interface iBXRestParamCrmTimelineLogMessageAdd {
  fields: iBXRestCrmTimelineLogMessageAddFields
}

/** Параметры получения или удаления лог-записи. */
export interface iBXRestParamCrmTimelineLogMessageGet {
  /** Идентификатор лог-записи. */
  id: number
}

/** Параметры списка лог-записей приложения. */
export interface iBXRestParamCrmTimelineLogMessageList extends iBXRestPagination {
  /** Идентификатор типа CRM-сущности. */
  entityTypeId: number
  /** Идентификатор элемента CRM. */
  entityId: number
  /** Сортировка по идентификатору и/или дате создания. */
  order?: Partial<Record<'id' | 'created', iBXRestCrmTimelineSortOrder>>
}

/** Контейнер лог-записи в ответах `add` и `get`. */
export interface iBXRestCrmTimelineLogMessageResult {
  logMessage: iBXRestCrmTimelineLogMessage
}

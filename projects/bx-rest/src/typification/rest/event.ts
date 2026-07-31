import { iBXRestPagination } from './base/api-pagination-bx'
import { iBXRestFilterKeys } from './base/filter-generator'

/** Режим доставки события. */
export type iBXRestEventType = 'online' | 'offline'

/** Дополнительные настройки обработчика события. */
export interface iBXRestEventBindOptions {
  /**
   * Минимальный интервал между уведомлениями `ONOFFLINEEVENT` в секундах.
   *
   * Если не указан, Битрикс24 использует интервал в одну секунду.
   */
  minTimeout?: number
  /** Дополнительные настройки, поддерживаемые конкретным событием. */
  [key: string]: unknown
}

/** Параметры `event.bind`. */
export interface iBXRestParamEventBind {
  /** Имя события, например `ONCRMLEADADD`. */
  event: string
  /** Внешний URL обработчика, доступный серверам Битрикс24. */
  handler: string
  /**
   * Идентификатор пользователя, под которым авторизуется обработчик.
   *
   * Если не указан, используется авторизация пользователя, действие которого
   * привело к событию.
   */
  auth_type?: number
  /** Режим доставки. По умолчанию — `online`. */
  event_type?: iBXRestEventType
  /**
   * Ключ источника для офлайн-событий.
   *
   * Позволяет разделять очередь по источникам и исключать ложные срабатывания.
   */
  auth_connector?: string
  /** Дополнительные настройки регистрируемого события. */
  options?: iBXRestEventBindOptions
}

/** Зарегистрированный обработчик, возвращаемый `event.get`. */
export interface iBXRestEventHandler {
  /** Имя события. */
  event: string
  /** URL обработчика. */
  handler: string
  /** Идентификатор пользователя авторизации в исходном формате REST API. */
  auth_type: string
  /** Признак офлайн-обработчика: `1` — офлайн, `0` — онлайн. */
  offline: 0 | 1
}

/** Параметры `event.unbind`. */
export interface iBXRestParamEventUnbind {
  /** Имя события. */
  event: string
  /** URL обработчика события. */
  handler: string
  /**
   * Идентификатор пользователя авторизации.
   *
   * Передайте `0`, чтобы удалить обработчики с пустым `auth_type`, не затрагивая
   * обработчики, зарегистрированные для конкретных пользователей.
   */
  auth_type?: number
  /** Режим доставки. По умолчанию — `online`. */
  event_type?: iBXRestEventType
}

/** Результат удаления обработчиков методом `event.unbind`. */
export interface iBXRestEventUnbindResult {
  /** Количество удаленных обработчиков. */
  count: number
}

/** Параметры получения общего списка доступных событий методом `events`. */
export interface iBXRestParamEvents {
  /** Разрешение, которому должны принадлежать возвращаемые события. */
  SCOPE?: string
  /**
   * Вернуть полный список событий.
   *
   * Игнорируется, если одновременно передан `SCOPE`.
   */
  FULL?: boolean
}

/** Поле записи очереди, доступное для фильтрации и сортировки. */
export type iBXRestEventOfflineField =
  | 'ID'
  | 'TIMESTAMP_X'
  | 'EVENT_NAME'
  | 'MESSAGE_ID'
  | 'PROCESS_ID'
  | 'ERROR'

/** Значение фильтра очереди офлайн-событий. */
export type iBXRestEventOfflineFilterValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]

/**
 * Фильтр очереди офлайн-событий.
 *
 * Операция указывается перед именем поля, например `=EVENT_NAME` или `>=ID`.
 */
export type iBXRestEventOfflineFilter = Partial<
  Record<
    `${iBXRestFilterKeys}${iBXRestEventOfflineField}`,
    iBXRestEventOfflineFilterValue
  >
>

/** Направление сортировки очереди офлайн-событий. */
export type iBXRestEventOfflineSortOrder = 'ASC' | 'DESC'

/** Сортировка очереди офлайн-событий. */
export type iBXRestEventOfflineOrder = Partial<
  Record<iBXRestEventOfflineField, iBXRestEventOfflineSortOrder>
>

/** Общие параметры выборки очереди офлайн-событий. */
export interface iBXRestParamEventOfflineSelection {
  /** Фильтр по полям записи очереди. */
  filter?: iBXRestEventOfflineFilter
  /** Сортировка по полям записи очереди. */
  order?: iBXRestEventOfflineOrder
  /**
   * Ключ источника.
   *
   * Должен совпадать с `auth_connector`, переданным при подписке через
   * `event.bind`.
   */
  auth_connector?: string
}

/** Параметры `event.offline.get`. */
export interface iBXRestParamEventOfflineGet
  extends iBXRestParamEventOfflineSelection {
  /** Максимальное количество записей. По умолчанию — `50`. */
  limit?: number
  /** Удалять выбранные записи: `1` — да, `0` — зарезервировать. По умолчанию — `1`. */
  clear?: 0 | 1
  /** Идентификатор процесса для повторного получения необработанных им записей. */
  process_id?: string
  /** Возвращать записи, помеченные ошибочными. По умолчанию — `0`. */
  error?: 0 | 1
}

/** Параметры `event.offline.list`. */
export interface iBXRestParamEventOfflineList
  extends iBXRestParamEventOfflineSelection, iBXRestPagination {}

/** Запись очереди офлайн-событий. */
export interface iBXRestEventOfflineItem {
  /** Идентификатор записи. */
  ID: string
  /** Дата и время создания записи в формате ISO 8601. */
  TIMESTAMP_X: string
  /** Имя события. */
  EVENT_NAME: string
  /** Данные события в исходном формате REST API. */
  EVENT_DATA: unknown
  /** Дополнительные данные события в исходном формате REST API. */
  EVENT_ADDITIONAL: unknown
  /** Идентификатор сообщения. */
  MESSAGE_ID: string
}

/** Запись, возвращаемая методом `event.offline.list`. */
export interface iBXRestEventOfflineListItem extends iBXRestEventOfflineItem {
  /** Идентификатор процесса, зарезервировавшего запись; пустая строка, если запись свободна. */
  PROCESS_ID: string
  /** Признак ошибки обработки в исходном формате REST API. */
  ERROR: '0' | '1'
}

/** Результат `event.offline.get`. */
export interface iBXRestEventOfflineGetResult {
  /**
   * Идентификатор зарезервированного пакета.
   *
   * Возвращается при `clear: 0`; при немедленной очистке имеет значение `null`.
   */
  process_id: string | null
  /** Выбранные записи очереди. */
  events: iBXRestEventOfflineItem[]
}

/** Параметры `event.offline.clear`. */
export interface iBXRestParamEventOfflineClear {
  /** Идентификатор пакета, полученный от `event.offline.get` при `clear: 0`. */
  process_id: string
  /**
   * Идентификаторы записей для удаления.
   *
   * Если не указаны, удаляются все записи пакета. Имеют приоритет над
   * `message_id`.
   */
  id?: (string | number)[]
  /** Значения `MESSAGE_ID` удаляемых записей. */
  message_id?: (string | number)[]
}

/** Параметры `event.offline.error`. */
export interface iBXRestParamEventOfflineError {
  /** Идентификатор процесса, обрабатывающего записи. */
  process_id: string
  /** Значения `MESSAGE_ID` записей, которые нужно пометить ошибочными. */
  message_id?: (string | number)[]
}


export interface iBXRestCalendarEventGetNearestParam {
  /**
   * Тип календаря:
   * - 'user' —
   * - 'group' — групповой календарь
   */
  type?:
    /** календарь пользователя */
    'user'
    /** групповой календарь */
    | 'group'
    /** календарь компании */
    | 'company_calendar'

  /** Идентификатор владельца календаря */
  ownerId?: string

  /** Количество дней для выборки (по умолчанию 60) */
  days?: number

  /** Учитывать только события текущего пользователя (по умолчанию false) */
  forCurrentUser?: boolean

  /** Максимальное количество возвращаемых событий */
  maxEventsCount?: number

  /** URL для календаря */
  detailUrl?: string
}
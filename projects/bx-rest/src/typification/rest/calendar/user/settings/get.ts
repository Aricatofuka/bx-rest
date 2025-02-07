import { iBXRestYesNo } from '../../../base/yes-no'

export interface iBXRestCalendarUserSettingsGet {
  /** Календарь для приглашений */
  meetSection: number
  /** Календарь для CRM */
  crmSection: number
  /** Скрывать нерабочее время в календаре в недельном и дневном представлении */
  collapseOffHours: boolean
  /** Показывать номер недель */
  showWeekNumbers: boolean
  /** Отображать задачи в календаре */
  showTasks: boolean
  /** Синхронизировать календарь задач */
  syncTasks: boolean
  /** Отображать завершенные задач */
  showCompletedTasks: boolean
  /**
   * Идентификатор календаря, который используется при создании событий, если в параметрах не передан идентификатор календаря.
   *
   * Значение по умолчанию — false
   */
  lastUsedSection: number | false
  /**
   * Настройки предустановленных календарей.
   *
   * Ключем объекта настроек может быть:
   *
   * user[id] — тип Календарь пользователя c идентификатором пользователя. Например, user12 соответствует календарю пользователя с идентификатором 12
   * group[id] — тип Календарь группы с идентификатором группы. Например, group36 соответствует календарю группы с идентификатором 36
   * Значением объекта является идентификатор календаря
   */
  defaultSections: Record<string, number>[]
  /** Количество месяцев для синхронизации в прошлом периоде */
  syncPeriodPast: number
  /** Количество месяцев для синхронизации в будущем периоде */
  syncPeriodFuture: number
}

export interface iBXRestCalendarUserSettingsGetHttp extends iBXRestCalendarUserSettingsGetBase {
  /** Календарь для приглашений */
  meetSection: string
  /** Календарь для CRM */
  crmSection: string
  /** Скрывать нерабочее время в календаре в недельном и дневном представлении */
  collapseOffHours: iBXRestYesNo
  /** Показывать номер недель */
  showWeekNumbers: iBXRestYesNo
  /** Отображать задачи в календаре */
  showTasks: iBXRestYesNo
  /** Синхронизировать календарь задач */
  syncTasks: iBXRestYesNo
  /** Отображать завершенные задач */
  showCompletedTasks: iBXRestYesNo
  /**
   * Идентификатор календаря, который используется при создании событий, если в параметрах не передан идентификатор календаря.
   *
   * Значение по умолчанию — false
   */
  lastUsedSection: string
  /** E-mail для отправки почтовых приглашений */
  sendFromEmail: string
  /**
   * Настройки предустановленных календарей.
   *
   * Ключем объекта настроек может быть:
   *
   * user[id] — тип Календарь пользователя c идентификатором пользователя. Например, user12 соответствует календарю пользователя с идентификатором 12
   * group[id] — тип Календарь группы с идентификатором группы. Например, group36 соответствует календарю группы с идентификатором 36
   * Значением объекта является идентификатор календаря
   */
  defaultSections: Record<string, string>[]
  /** Количество месяцев для синхронизации в прошлом периоде */
  syncPeriodPast: string
  /** Количество месяцев для синхронизации в будущем периоде */
  syncPeriodFuture: string

}

export interface iBXRestCalendarUserSettingsGetBase {
  /** Стандартное представление для календаря */
  view: 'day' | 'week' | 'list'
  /** Показывать события, в которых пользователь отказался принять участие */
  showDeclined: boolean
  /** Запрещать приглашать в событие, если время занято */
  denyBusyInvitation: boolean
  /** Объект со стандартными настройками напоминаний о событии */
  defaultReminders: {
    fullDay: iBXRestCalendarUserSettingsGetDefaultReminders[],
    withTime: iBXRestCalendarUserSettingsGetDefaultReminders[],
  }
  /** Таймзона календаря */
  timezoneName: string
  /** Смешение таймзоны относительно UTC в секундах */
  timezoneOffsetUTC: number
  /** Если параметр timezoneName не установлен, здесь будет указан часовой пояс из параметра timezoneOffsetUTC */
  timezoneDefaultName: string
  /** Время начала рабочего дня */
  work_time_start: string
  /** Время окончания рабочего дня */
  work_time_end: string
}


export interface iBXRestCalendarUserSettingsGetDefaultReminders {
  type: 'min' | 'day' | 'hour'
  count: number
}
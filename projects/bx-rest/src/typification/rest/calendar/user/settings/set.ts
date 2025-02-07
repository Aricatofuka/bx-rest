import { iBXRestYesNo } from '../../../base/yes-no'
import {
  iBXRestCalendarUserSettingsGetDefaultReminders
} from './get'

export interface iBXRestCalendarUserSettingsSetParam {
  settings: {
    /**
     * Вид календаря. Возможные значения:
     * - 'month' — месяц
     * - 'week' — неделя
     * - 'day' — день
     */
    view?: 'month' | 'week' | 'day'

    /** Раздел встреч. Идентификатор раздела */
    meetSection?: number

    /** Раздел CRM. Идентификатор раздела */
    crmSection?: number

    /** Показывать отклоненные события */
    showDeclined?: boolean

    /** Отклонять приглашения на занятые время */
    denyBusyInvitation?: boolean

    /** Свернуть внерабочие часы. Возможные значения */
    collapseOffHours?: iBXRestYesNo

    /** Показывать номера недель */
    showWeekNumbers?: iBXRestYesNo

    /** Показывать задачи */
    showTasks?: iBXRestYesNo

    /** Синхронизировать задачи */
    syncTasks?: iBXRestYesNo

    /** Показывать завершенные задачи */
    showCompletedTasks?: iBXRestYesNo

    /** Последний использованный раздел */
    lastUsedSection?: 'true' | 'false'

    /** Электронная почта для отправки. Адрес электронной почты */
    sendFromEmail?: string

    /** Стандартные разделы. Объект, где ключ — идентификатор раздела, значение — его название */
    defaultSections?: Record<string, string | number>

    /** Период синхронизации в прошлом. Число дней */
    syncPeriodPast?: number

    /** Период синхронизации в будущем. Число дней */
    syncPeriodFuture?: number

    /**
     * Стандартные напоминания. Объект с массивами напоминаний для целого дня и с временем.
     */
    defaultReminders?: {
      fullDay?: iBXRestCalendarUserSettingsGetDefaultReminders[]
      withTime?: iBXRestCalendarUserSettingsGetDefaultReminders[]
    }

    /** Название часового пояса. Например, 'Europe/Riga' */
    timezoneName?: string

    /** Смещение часового пояса от UTC в секундах */
    timezoneOffsetUTC?: number

    /** Название стандартного часового пояса. Например, 'Europe/Riga' */
    timezoneDefaultName?: string

    /** Время начала рабочего дня. В формате 'HH:mm' */
    work_time_start?: string

    /** Время окончания рабочего дня. В формате 'HH:mm' */
    work_time_end?: string
  }
}
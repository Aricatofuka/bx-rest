type BXRestTimeManStatusDay = 'OPENED' | 'CLOSE' | 'PAUSED' | 'EXPIRED' // Статусы рабочего дня

/** Параметры для timeman.status */
export interface iBXRestParamTimeManStatus {
  /** Идентификатор пользователя (по умолчанию текущий) */
  USER_ID?: number
}

/** Параметры для timeman.open */
export interface iBXRestParamTimeManOpen {
  /** Идентификатор пользователя (по умолчанию текущий) */
  USER_ID?: number
  /** Время начала дня в формате ISO-8601 */
  TIME?: string
  /** Причина изменения рабочего дня */
  REPORT?: string
  /** Широта точки начала дня */
  LAT?: number
  /** Долгота точки начала дня */
  LON?: number
}

/** Параметры для timeman.close */
export interface iBXRestParamTimeManClose {
  /** Идентификатор пользователя (по умолчанию текущий) */
  USER_ID?: number
  /** Время окончания дня в формате ISO-8601 */
  TIME?: string
  /** Причина изменения рабочего дня */
  REPORT?: string
  /** Широта точки окончания дня */
  LAT?: number
  /** Долгота точки окончания дня */
  LON?: number
}

/** Параметры для timeman.pause */
export interface iBXRestParamTimeManPause {
  /** Идентификатор пользователя (по умолчанию текущий) */
  USER_ID?: number
}

/** Параметры для timeman.settings */
export interface iBXRestParamTimeManSettings {
  /** Идентификатор пользователя (по умолчанию текущий) */
  USER_ID?: number
}

/** Ответ timeman.status после маппинга в Date/числа */
export interface iBXRestTimeManStatus extends iBXRestTimeManStatusBase {
  /** Дата начала рабочего дня */
  TIME_START: Date | undefined,
  /** Дата завершения рабочего дня */
  TIME_FINISH: Date | undefined,
  /** Длительность рабочего дня в секундах */
  DURATION: number,
  /** Суммарная длительность перерывов в секундах */
  TIME_LEAKS: number,
}

/** Ответ timeman.status в сыром виде от API */
export interface iBXRestTimeManStatusHttp extends iBXRestTimeManStatusBase {
  /** Дата начала рабочего дня в ISO-8601 */
  TIME_START: string | null,
  /** Дата завершения рабочего дня в ISO-8601 */
  TIME_FINISH: string | null,
  /** Длительность рабочего дня в HH:MM:SS */
  DURATION: string,
  /** Суммарная длительность перерывов в HH:MM:SS */
  TIME_LEAKS: string,
}

/** Базовые поля статуса рабочего дня */
interface iBXRestTimeManStatusBase {
  /** Статус текущего рабочего дня */
  STATUS: BXRestTimeManStatusDay,
  /** Требуется подтверждение руководителем (false если ждет) */
  ACTIVE: boolean,
  /** IP при открытии дня */
  IP_OPEN: string,
  /** IP при закрытии дня */
  IP_CLOSE: string,
  /** Широта точки начала дня */
  LAT_OPEN: number,
  /** Долгота точки начала дня */
  LON_OPEN: number,
  /** Широта точки окончания дня */
  LAT_CLOSE: number,
  /** Долгота точки окончания дня */
  LON_CLOSE: number,
  /** Смещение часового пояса начала дня */
  TZ_OFFSET: number
}

/** Настройки учета рабочего времени пользователя */
export interface iBXRestTimeManSettings {
  /** Учет рабочего времени включен */
  UF_TIMEMAN: boolean,
  /** Свободный график включен */
  UF_TM_FREE: boolean,
  /** Максимальное время начала дня HH:MM:SS */
  UF_TM_MAX_START: string,
  /** Минимальное время завершения HH:MM:SS */
  UF_TM_MIN_FINISH: string,
  /** Минимальная длительность дня HH:MM:SS */
  UF_TM_MIN_DURATION: string,
  /** Допустимая дельта изменений HH:MM:SS */
  UF_TM_ALLOWED_DELTA: string,
  /** Может управлять днями других сотрудников (только для текущего пользователя) */
  ADMIN?: boolean
}
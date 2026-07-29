import { iBXRestBizprocRegistrationFields } from './base/registration'

/** Параметры `bizproc.activity.add`. */
export interface iBXRestParamBizprocActivityAdd
  extends iBXRestBizprocRegistrationFields {
  /** Уникальный в рамках приложения символьный код действия. */
  CODE: string
}

/** Параметры `bizproc.activity.update`. */
export interface iBXRestParamBizprocActivityUpdate {
  /** Символьный код зарегистрированного действия. */
  CODE: string
  /** Новые поля действия. */
  FIELDS: iBXRestBizprocRegistrationFields
}

/** Параметры `bizproc.activity.delete`. */
export interface iBXRestParamBizprocActivityDelete {
  /** Символьный код зарегистрированного действия. */
  CODE: string
}

/** Параметры `bizproc.activity.log`. */
export interface iBXRestParamBizprocActivityLog {
  /** Актуальный токен события, полученный обработчиком действия. */
  EVENT_TOKEN: string
  /** Сообщение для журнала бизнес-процесса. */
  LOG_MESSAGE: string
}

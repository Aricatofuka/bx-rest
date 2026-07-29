/** Параметры `bizproc.event.send`. */
export interface iBXRestParamBizprocEventSend {
  /** Актуальный токен события, полученный обработчиком действия или робота. */
  EVENT_TOKEN: string
  /** Значения зарегистрированных выходных параметров. */
  RETURN_VALUES?: Record<string, unknown>
  /** Сообщение для журнала бизнес-процесса. */
  LOG_MESSAGE?: string
}

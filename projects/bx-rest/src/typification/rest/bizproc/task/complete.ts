/** Допустимый результат выполнения задания бизнес-процесса. */
export type iBXRestBizprocTaskCompleteStatus =
  | 1
  | 2
  | 3
  | 4
  | 'yes'
  | 'no'
  | 'ok'
  | 'cancel'

/** Параметры `bizproc.task.complete`. */
export interface iBXRestParamBizprocTaskComplete {
  /** Идентификатор задания. */
  TASK_ID: number
  /** Целевой статус задания. */
  STATUS: iBXRestBizprocTaskCompleteStatus
  /** Комментарий пользователя. */
  COMMENT?: string
  /** Значения полей задания с запросом дополнительной информации. */
  FIELDS?: Record<string, unknown>
}

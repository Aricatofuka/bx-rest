/** Параметры `bizproc.task.delegate`. */
export interface iBXRestParamBizprocTaskDelegate {
  /** Идентификаторы делегируемых заданий. */
  TASK_IDS: number[]
  /** Пользователь, от которого делегируются задания. */
  FROM_USER_ID: number
  /** Пользователь, которому делегируются задания. */
  TO_USER_ID: number
}

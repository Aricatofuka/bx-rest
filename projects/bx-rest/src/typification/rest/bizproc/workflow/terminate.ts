/** Параметры `bizproc.workflow.terminate`. */
export interface iBXRestParamBizprocWorkflowTerminate {
  /** Идентификатор запущенного бизнес-процесса. */
  ID: string
  /** Текст статуса, который будет установлен при остановке. */
  STATUS?: string
}

/** Параметры `bizproc.workflow.start`. */
export interface iBXRestParamBizprocWorkflowStart {
  /** Идентификатор шаблона бизнес-процесса. */
  TEMPLATE_ID: number
  /**
   * Документ в формате `[модуль, объект, идентификатор элемента]`.
   *
   * @example ['crm', 'CCrmDocumentDeal', 'DEAL_777']
   */
  DOCUMENT_ID: string[]
  /** Значения входных параметров шаблона. */
  PARAMETERS?: Record<string, unknown>
}

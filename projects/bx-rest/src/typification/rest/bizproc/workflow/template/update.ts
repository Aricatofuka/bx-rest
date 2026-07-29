import {
  iBXRestBizprocWorkflowTemplateAutoExecute,
  iBXRestBizprocWorkflowTemplateFile
} from './add'

/** Изменяемые поля шаблона бизнес-процесса. */
export interface iBXRestBizprocWorkflowTemplateUpdateFields {
  /** Новое название шаблона. */
  NAME?: string
  /** Новое описание шаблона. */
  DESCRIPTION?: string
  /** Новое содержимое файла `.bpt`. */
  TEMPLATE_DATA?: iBXRestBizprocWorkflowTemplateFile
  /** Новый режим автозапуска. */
  AUTO_EXECUTE?: iBXRestBizprocWorkflowTemplateAutoExecute
}

/** Параметры `bizproc.workflow.template.update`. */
export interface iBXRestParamBizprocWorkflowTemplateUpdate {
  /** Идентификатор шаблона. */
  ID: number | string
  /** Поля, которые необходимо обновить. */
  FIELDS: iBXRestBizprocWorkflowTemplateUpdateFields
}

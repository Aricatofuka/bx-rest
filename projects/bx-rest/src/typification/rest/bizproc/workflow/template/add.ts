import { iBXRestBizprocDocumentType } from '../../base/registration'

/** Настройка автоматического запуска шаблона бизнес-процесса. */
export type iBXRestBizprocWorkflowTemplateAutoExecute = 0 | 1 | 2 | 3

/** Файл шаблона в формате `[имя файла, содержимое Base64]`. */
export type iBXRestBizprocWorkflowTemplateFile = [
  fileName: string,
  base64Content: string
]

/** Параметры `bizproc.workflow.template.add`. */
export interface iBXRestParamBizprocWorkflowTemplateAdd {
  /** Тип объектов, к которым будет привязан шаблон. */
  DOCUMENT_TYPE: iBXRestBizprocDocumentType
  /** Название шаблона. */
  NAME: string
  /** Описание шаблона. */
  DESCRIPTION?: string
  /** Содержимое файла `.bpt`. */
  TEMPLATE_DATA: iBXRestBizprocWorkflowTemplateFile
  /** Режим автозапуска; по умолчанию `0`. */
  AUTO_EXECUTE?: iBXRestBizprocWorkflowTemplateAutoExecute
}

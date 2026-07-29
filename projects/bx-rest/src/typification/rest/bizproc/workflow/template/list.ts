import { iBXRestPagination } from '../../../base/api-pagination-bx'
import { iBXRestFilterGenerator } from '../../../base/filter-generator'
import { iBXRestParamSort } from '../../../base/sort'
import { iBXRestYesNo } from '../../../base/yes-no'
import { iRestBXBizprocWorkflowTemplateFieldEnum } from '../../base/filedEnum'
import { iBXRestBizprocWorkflowTemplateAutoExecute } from './add'

/** Параметры `bizproc.workflow.template.list`. */
export interface iBXRestParamBizprocWorkflowTemplateList
  extends iBXRestPagination {
  /** Поля результата; по умолчанию возвращается только `ID`. */
  select?: iRestBXBizprocWorkflowTemplateFieldEnum[]
  /** Фильтр по полям шаблона. */
  filter?: iBXRestParamBizprocWorkflowTemplateListFilter
  /** Сортировка; по умолчанию `{ ID: 'ASC' }`. */
  order?: Partial<
    Record<iRestBXBizprocWorkflowTemplateFieldEnum, iBXRestParamSort>
  >
}

/** Фильтр списка шаблонов с поддержкой операторов сравнения. */
export type iBXRestParamBizprocWorkflowTemplateListFilter =
  iBXRestFilterGenerator<
    Partial<Record<iRestBXBizprocWorkflowTemplateFieldEnum, unknown>>
  >

/** Шаблон бизнес-процесса, возвращаемый методом списка. */
export interface iBXRestBizprocWorkflowTemplate {
  ID?: string
  MODULE_ID?: string
  ENTITY?: string
  DOCUMENT_TYPE?: string
  AUTO_EXECUTE?: iBXRestBizprocWorkflowTemplateAutoExecute
  NAME?: string
  TEMPLATE?: unknown[]
  PARAMETERS?: unknown[]
  VARIABLES?: unknown[]
  CONSTANTS?: unknown[]
  MODIFIED?: string
  IS_MODIFIED?: iBXRestYesNo
  USER_ID?: string
  SYSTEM_CODE?: string
}

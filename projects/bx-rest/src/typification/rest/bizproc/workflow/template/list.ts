import { iRestBXBizprocWorkflowTemplateFieldEnum } from '../../base/filedEnum'

export interface iBXRestParamBizprocWorkflowTemplateList {
  select: iRestBXBizprocWorkflowTemplateFieldEnum[],
  filter: iBXRestParamBizprocWorkflowTemplateListFilter
}

export type iBXRestParamBizprocWorkflowTemplateListFilter = {
  [Property in iRestBXBizprocWorkflowTemplateFieldEnum]?: any
}

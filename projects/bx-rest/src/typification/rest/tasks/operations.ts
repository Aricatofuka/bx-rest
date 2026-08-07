export type iBXRestTasksObject = Record<string, unknown>
export type iBXRestTasksParams = Record<string, unknown>

export interface iBXRestParamTasksTaskId {
  taskId: number
}

export interface iBXRestParamTasksFlowId {
  id: number
}

export interface iBXRestParamTasksFlowCreate {
  flowData: Record<string, unknown>
}

export interface iBXRestParamTasksFlowUpdate extends iBXRestParamTasksFlowId {
  flowData: Record<string, unknown>
}

export interface iBXRestParamTasksTemplateId {
  templateId: number
}

export interface iBXRestParamTasksTemplateFields {
  fields: Record<string, unknown>
}

export interface iBXRestParamTasksTemplateUpdate extends iBXRestParamTasksTemplateId {
  fields: Record<string, unknown>
}

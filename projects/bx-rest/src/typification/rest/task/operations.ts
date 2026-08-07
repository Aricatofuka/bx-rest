export type iBXRestTaskObject = Record<string, unknown>

export interface iBXRestParamTaskChecklistItemAdd {
  TASKID: number
  FIELDS: Record<string, unknown>
}

export interface iBXRestParamTaskChecklistItem {
  TASKID: number
  ITEMID: number
}

export interface iBXRestParamTaskChecklistItemUpdate extends iBXRestParamTaskChecklistItem {
  FIELDS: Record<string, unknown>
}

export interface iBXRestParamTaskChecklistItemMove extends iBXRestParamTaskChecklistItem {
  AFTERITEMID: number
}

export interface iBXRestParamTaskChecklistItemAction extends iBXRestParamTaskChecklistItem {
  ACTIONID: number
}

export interface iBXRestParamTaskDependence {
  taskIdFrom: number
  taskIdTo: number
  linkType: 0 | 1 | 2 | 3
}

export interface iBXRestParamTaskItemAction {
  TASKID: number
  ITEMID: number
  ACTIONID: number
}

export interface iBXRestParamTaskItemUserFieldAdd {
  PARAMS: Record<string, unknown>
}

export interface iBXRestParamTaskItemUserFieldId {
  ID: number
}

export interface iBXRestParamTaskItemUserFieldUpdate extends iBXRestParamTaskItemUserFieldId {
  DATA: Record<string, unknown>
}

export interface iBXRestParamTaskStagesDelete {
  id: number
  isAdmin?: boolean
}

export interface iBXRestParamTaskStagesMoveTask {
  id: number
  stageId: number
  before?: number
  after?: number
}

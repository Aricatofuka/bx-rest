export interface iBXRestParamTaskGetAccess {
  id: number
  /**
   * Чеи права чекать, по у молчанию чекаются того кто запрашивает
   */
  users?: number[]
}

export interface iBXRestTaskGetAccess {
  allowedActions: {
    [key: number]: iBXRestTaskGetAccessItem
  }
}

export interface iBXRestTaskGetAccessItem {
  ACCEPT: boolean,
  DECLINE: boolean,
  COMPLETE: boolean,
  APPROVE: boolean,
  DISAPPROVE: boolean,
  START: boolean,
  PAUSE: boolean,
  DELEGATE: boolean,
  REMOVE: boolean,
  EDIT: boolean,
  DEFER: boolean,
  RENEW: boolean,
  CREATE: boolean,
  CHANGE_DEADLINE: boolean,
  CHECKLIST_ADD_ITEMS: boolean,
  ADD_FAVORITE: true,
  DELETE_FAVORITE: boolean,
  RATE: boolean,
  'EDIT.ORIGINATOR': boolean,
  'CHECKLIST.REORDER': boolean,
  'ELAPSEDTIME.ADD': boolean,
  'DAYPLAN.TIMER.TOGGLE': boolean,
  'EDIT.PLAN': boolean,
  'CHECKLIST.ADD': boolean,
  'FAVORITE.ADD': boolean,
  'FAVORITE.DELETE': boolean
}

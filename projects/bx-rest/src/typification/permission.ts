import { iBXRestTaskGetAccessItem } from './rest/task/access/getaccess'

export interface iBXRestPermission {
  tasks?: {
    id: number,
    permission: iBXRestTaskGetAccessItem
    elapsedItem: iBXRestPermissionAddictionItem[]
  }[]
}

export interface iBXRestPermissionItem {
  edit: boolean
  add: boolean
  del: boolean
  verified: {
    edit: boolean
    add: boolean
    del: boolean
  }
}

export interface iBXRestPermissionAddictionItem{
  id: number
  edit: boolean
  del: boolean
  verified: {
    edit: boolean
    del: boolean
  }
}

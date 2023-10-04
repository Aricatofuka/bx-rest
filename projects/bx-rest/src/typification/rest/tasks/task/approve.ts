export interface BXRestTasksTaskApproveHttp {
  id: string
  parentId: string | null
  title: string
  description: string
  mark: null
  priority: string
  multitask: string
  notViewed: string
  replicate: string
  stageId: string
  createdBy: string
  createdDate: string
  responsibleId: string
  changedBy: string
  changedDate: string
  statusChangedBy: string
  closedBy: string
  closedDate: string
  activityDate: string
  dateStart: string | null
  deadline: string | null
  startDatePlan: string | null
  endDatePlan: string | null
  guid: string
  xmlId: string | null
  commentsCount: string
  serviceCommentsCount: string
  allowChangeDeadline: string
  allowTimeTracking: string
  taskControl: string
  addInReport: string
  forkedByTemplateId: string | null
  timeEstimate: string
  timeSpentInLogs: string
  matchWorkTime: string
  forumTopicId: string
  forumId: string
  siteId: string
  subordinate: string
  exchangeModified: string | null
  exchangeId: string | null
  outlookVersion: string
  viewedDate: string
  sorting: string
  durationFact: string
  isMuted: string
  isPinned: string
  isPinnedInGroup: string
  descriptionInBbcode: string
  status: string
  statusChangedDate: string
  durationPlan: string
  durationType: string
  favorite: string
  groupId: string
  auditors: any[]
  accomplices: any[]
  checklist: any[]
  group: BXRestTasksTaskApproveGroup
  creator: BXRestTasksTaskApproveCreator
  responsible: BXRestTasksTaskApproveResponsible
  accomplicesData: any[]
  auditorsData: any[]
  newCommentsCount: number
  action: BXRestTasksTaskApproveAction
  checkListTree: BXRestTasksTaskApproveCheckListTree
  checkListCanAdd: boolean
}


interface BXRestTasksTaskApproveGroup {
  id: string
  name: string
  opened: boolean
  membersCount: number
  image: string
  additionalData: any[]
}

interface BXRestTasksTaskApproveCreator {
  id: string
  name: string
  link: string
  icon: string
  workPosition: string
}

interface BXRestTasksTaskApproveResponsible {
  id: string
  name: string
  link: string
  icon: string
  workPosition: string
}

interface BXRestTasksTaskApproveAction {
  accept: boolean
  decline: boolean
  complete: boolean
  approve: boolean
  disapprove: boolean
  start: boolean
  pause: boolean
  delegate: boolean
  remove: boolean
  edit: boolean
  defer: boolean
  renew: boolean
  create: boolean
  changeDeadline: boolean
  checklistAddItems: boolean
  addFavorite: boolean
  deleteFavorite: boolean
  rate: boolean
  "edit.originator": boolean
  "checklist.reorder": boolean
  "elapsedtime.add": boolean
  "dayplan.timer.toggle": boolean
  "edit.plan": boolean
  "checklist.add": boolean
  "favorite.add": boolean
}

interface BXRestTasksTaskApproveCheckListTree {
  nodeId: number
  fields: BXRestTasksTaskApproveFields
  action: any[]
  descendants: any[]
}

interface BXRestTasksTaskApproveFields {
  id: string | null
  copiedId: string | null
  entityId: string | null
  userId: number
  createdBy: string | null
  parentId: string | null
  title: string
  sortIndex: string | null
  displaySortIndex: string | null
  isComplete: boolean
  isImportant: boolean
  completedCount: number
  members: any[]
  attachments: any[]
}

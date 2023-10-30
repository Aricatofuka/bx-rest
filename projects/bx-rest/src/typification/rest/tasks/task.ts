import { iBXRestYesNo } from '../base/YesNo'
import { iBXRestHttpTaskPeople, iBXRestTaskPeople } from './base/people'

export interface iBXRestTask extends iBXRestBaseTask {
  id: number,
  parentId: number,
  priority: number,
  status: number,
  multitask: boolean,
  groupId: number,
  stageId: number,
  createdBy: number,
  createdDate: Date,
  responsibleId: number,
  changedBy: number,
  changedDate: Date,
  statusChangedBy: number,
  statusChangedDate: Date,
  closedBy: number,
  closedDate: Date,
  dateStart: Date,
  deadline: Date,
  startDatePlan: Date,
  endDatePlan: Date,
  forumTopicId: number,
  forumId: number,
  viewedDate: Date,
  sorting: number,
  durationPlan: number,
  descriptionInBbcode: boolean,
  accomplices: number[],
  subStatus: number,
  creator: iBXRestTaskPeople,
  responsible: iBXRestTaskPeople,
  accomplicesData: iBXRestTaskPeople[],
  allowTimeTracking: boolean
}

export interface iBXRestHttpTask extends iBXRestBaseTask {
  id: string,
  parentId: string
  priority: string
  status: string
  multitask: iBXRestYesNo,
  groupId: string
  group: iBXRestHttpTaskGroupHttp
  stageId: string
  createdBy: string
  createdDate: string
  responsibleId: string
  changedBy: string
  changedDate: string
  statusChangedBy: string
  statusChangedDate: string
  closedBy: string
  closedDate: string | null
  dateStart: string
  deadline: string
  startDatePlan: string
  endDatePlan: string
  forumTopicId: string
  forumId: string
  viewedDate: string
  sorting: string
  durationPlan: string
  descriptionInBbcode: iBXRestYesNo
  accomplices: string[]
  subStatus: string
  additionalData: any[] // TODO: разобраться позже
  creator: iBXRestHttpTaskPeople
  responsible: iBXRestHttpTaskPeople
  accomplicesData: {[key: number]: iBXRestHttpTaskPeople}
  allowTimeTracking: iBXRestYesNo
}

export interface iBXRestHttpTaskGroupHttp {
  id: string
  name: string
  opened: boolean
  membersCount: number
}

export interface iBXRestBaseTask {
  title: string,
  description: string,
  mark: string,
  notViewed: string,
  replicate: string,
  guid: string,
  xmlId: string,
  commentsCount: string,
  taskControl: string,
  addInReport: string,
  forkedByTemplateId: string,
  timeEstimate: string,
  timeSpentInLogs: string,
  matchWorkTime: string,
  siteId: string,
  subordinate: string,
  favorite: string,
  exchangeModified: string,
  exchangeId: string,
  outlookVersion: string,
  durationFact: string,
  durationType: string,
  ufCrmTask: number[],
  ufTaskWebdavFiles: number[],
  ufMailMessage: string,
  auditors: number[],
  newCommentsCount: number,
  tags: string[]
}



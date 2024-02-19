import { iBXRestTaskGetAccess } from '../../typification/rest/task/access/getaccess'
import { BaseMapServices } from '../base'
import { Injectable } from '@angular/core'
import {
  iBXRestTasksTaskList,
  iBXRestTasksTaskListHttp,
} from '../../typification/rest/tasks/task/list'
import {
  iBXRestTasksTaskGetHttp, iBXRestTasksTaskGetHttpDefault
} from '../../typification/rest/tasks/task/get'
import { BXRestMapTasksTaskResult } from './task/result'
import { iBXRestHttpTask, iBXRestTask, iBXRestTaskHttpTag } from '../../typification/rest/tasks/task'
import { iBXRestTaskFieldsName } from '../../typification/rest/tasks/base/fieldsName'
import { BX_REST_SETTINGS } from '../../settings'
import values from 'just-values'

@Injectable({
  providedIn: 'root'
})
export class BXRestMapTasksTask extends BaseMapServices {

  constructor(
    BX_REST_SETTINGS: BX_REST_SETTINGS,
    public result: BXRestMapTasksTaskResult
  ) {
    super(BX_REST_SETTINGS)
  }

  getAccess(v: iBXRestTaskGetAccess | undefined) {
    return (v && v.allowedActions) ? v.allowedActions : undefined
  }

  add(item: { task: iBXRestTasksTaskGetHttpDefault } | undefined): iBXRestTask | undefined {
    return (item) ? this.TaskBXHttpToTaskBX(item.task) : undefined
  }

  get<S extends iBXRestTaskFieldsName[], CustomFields>(item: iBXRestTasksTaskGetHttp<S, CustomFields> | undefined) {
    return (item && item.task) ?
      this.TaskBXHttpToTaskBX(item.task)
      : undefined
  }

  list<S extends iBXRestTaskFieldsName[], CustomFields>(item: iBXRestTasksTaskListHttp<S, CustomFields> | undefined) {
    return (item && item.tasks)
      ? item.tasks.map(i => this.TaskBXHttpToTaskBX<CustomFields, Partial<iBXRestHttpTask> & Partial<CustomFields>, iBXRestTasksTaskList<S, CustomFields>>(i))
      : undefined
  }

  private TaskBXHttpToTaskBX<CustomFields, T extends Partial<iBXRestHttpTask> & Partial<CustomFields>, R>(item: T): R {
    let result: any = {}
    if (item.id) {
      result.id = this.toNum(item.id)
    }
    if (item.parentId) {
      result.parentId = this.toNum(item.parentId)
    }
    if (item.priority) {
      result.priority = this.toNum(item.priority)
    }
    if (item.status) {
      result.status = this.toNum(item.status)
    }
    if (item.multitask) {
      result.multitask = item.multitask === 'Y'
    }
    if (item.groupId) {
      result.groupId = this.toNum(item.groupId)
    }
    if (item.stageId) {
      result.stageId = this.toNum(item.stageId)
    }
    if (item.createdBy) {
      result.createdBy = this.toNum(item.createdBy)
    }
    if (item.createdDate) {
      result.createdDate = this.toDate(item.createdDate)
    }
    if (item.responsibleId) {
      result.responsibleId = this.toNum(item.responsibleId)
    }
    if (item.changedBy) {
      result.changedBy = this.toNum(item.changedBy)
    }
    if (item.changedDate) {
      result.changedDate = this.toDate(item.changedDate)
    }
    if (item.statusChangedBy) {
      result.statusChangedBy = this.toNum(item.statusChangedBy)
    }
    if (item.statusChangedDate) {
      result.statusChangedDate = this.toDate(item.statusChangedDate)
    }
    if (item.closedBy) {
      result.closedBy = this.toNum(item.closedBy)
    }
    if (item.closedDate) {
      result.closedDate = this.toDate(item.closedDate)
    }
    if (item.dateStart) {
      result.dateStart = this.toDate(item.dateStart)
    }
    if (item.deadline) {
      result.deadline = this.toDate(item.deadline)
    }
    if (item.startDatePlan) {
      result.startDatePlan = this.toDate(item.startDatePlan)
    }
    if (item.endDatePlan) {
      result.endDatePlan = this.toDate(item.endDatePlan)
    }
    if (item.forumTopicId) {
      result.forumTopicId = this.toNum(item.forumTopicId)
    }
    if (item.forumId) {
      result.forumId = this.toNum(item.forumId)
    }
    if (item.viewedDate) {
      result.viewedDate = this.toDate(item.viewedDate)
    }
    if (item.sorting) {
      result.sorting = this.toNum(item.sorting)
    }
    if (item.durationPlan) {
      result.durationPlan = this.toNum(item.durationPlan)
    }
    if (item.descriptionInBbcode) {
      result.descriptionInBbcode = item.descriptionInBbcode === 'Y'
    }
    if (item.accomplices) {
      result.accomplices = item.accomplices.map(i => this.toNum(i))
    }
    if (item.subStatus) {
      result.subStatus = this.toNum(item.subStatus)
    }
    if (item.creator) {
      result.creator = Object.assign(item.creator, {id: this.toNum(item.creator.id)})
    }
    if (item.responsible) {
      result.responsible = Object.assign(item.responsible, {id: this.toNum(item.responsible.id)})
    }
    if (item.accomplicesData) {
      result.accomplicesData =
        Object.values(item.accomplicesData).map(i => Object.assign(i, {id: this.toNum(i.id)}))
    }
    if (item.allowTimeTracking) {
      result.allowTimeTracking = item.allowTimeTracking === 'Y'
    }

    if (item.tags) {
      result.tags = values<iBXRestTaskHttpTag>(item.tags).map(i => {
        return {
          id: this.toNum(i.id),
          title: i.title
        }
      })
    }

    return Object.assign(item, result)
  }
}

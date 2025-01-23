import { iBXRestTaskGetAccess } from '../../typification/rest/task/access/getaccess'
import {
  iBXRestTasksTaskList,
  iBXRestTasksTaskListHttp,
} from '../../typification/rest/tasks/task/list'
import {
  iBXRestTasksTaskGetHttp, iBXRestTasksTaskGetHttpDefault
} from '../../typification/rest/tasks/task/get'
import { BXRestMapTasksTaskResult } from './task/result'
import { iBXRestHttpTask, iBXRestTask, iBXRestTaskHttpTag } from '../../typification/rest/tasks/task'
import { iBXRestTaskFieldsName } from '../../typification/rest/tasks/base/fields-name'
import values from 'just-values'
import { toDate, toNum } from '../../services/base'

export class BXRestMapTasksTask {
  public readonly result = BXRestMapTasksTaskResult

  static getAccess(v: iBXRestTaskGetAccess | undefined) {
    return (v && v.allowedActions) ? v.allowedActions : undefined
  }

  static add(item: { task: iBXRestTasksTaskGetHttpDefault } | undefined): iBXRestTask | undefined {
    return (item) ? BXRestMapTasksTask.TaskBXHttpToTaskBX(item.task) : undefined
  }

  static get<S extends iBXRestTaskFieldsName[], CustomFields>(item: iBXRestTasksTaskGetHttp<S, CustomFields> | undefined) {
    return (item && item.task) ?
      BXRestMapTasksTask.TaskBXHttpToTaskBX(item.task)
      : undefined
  }

  static list<S extends iBXRestTaskFieldsName[], CustomFields>(item: iBXRestTasksTaskListHttp<S, CustomFields> | undefined) {
    return (item && item.tasks)
      ? item.tasks.map(i => BXRestMapTasksTask.TaskBXHttpToTaskBX<
        CustomFields,
        Partial<iBXRestHttpTask> & Partial<CustomFields>,
        iBXRestTasksTaskList<S, CustomFields>
      >(i))
      : undefined
  }

  static TaskBXHttpToTaskBX<CustomFields, T extends Partial<iBXRestHttpTask> & Partial<CustomFields>, R>(item: T): R {
    let result: any = {}
    if (item.id) {
      result.id = toNum(item.id)
    }
    if (item.parentId) {
      result.parentId = toNum(item.parentId)
    }
    if (item.priority) {
      result.priority = toNum(item.priority)
    }
    if (item.status) {
      result.status = toNum(item.status)
    }
    if (item.multitask) {
      result.multitask = item.multitask === 'Y'
    }
    if (item.groupId) {
      result.groupId = toNum(item.groupId)
    }
    if (item.stageId) {
      result.stageId = toNum(item.stageId)
    }
    if (item.createdBy) {
      result.createdBy = toNum(item.createdBy)
    }
    if (item.createdDate) {
      result.createdDate = toDate(item.createdDate)
    }
    if (item.responsibleId) {
      result.responsibleId = toNum(item.responsibleId)
    }
    if (item.changedBy) {
      result.changedBy = toNum(item.changedBy)
    }
    if (item.changedDate) {
      result.changedDate = toDate(item.changedDate)
    }
    if (item.statusChangedBy) {
      result.statusChangedBy = toNum(item.statusChangedBy)
    }
    if (item.statusChangedDate) {
      result.statusChangedDate = toDate(item.statusChangedDate)
    }
    if (item.closedBy) {
      result.closedBy = toNum(item.closedBy)
    }
    if (item.closedDate) {
      result.closedDate = toDate(item.closedDate)
    }
    if (item.dateStart) {
      result.dateStart = toDate(item.dateStart)
    }
    if (item.deadline) {
      result.deadline = toDate(item.deadline)
    }
    if (item.startDatePlan) {
      result.startDatePlan = toDate(item.startDatePlan)
    }
    if (item.endDatePlan) {
      result.endDatePlan = toDate(item.endDatePlan)
    }
    if (item.forumTopicId) {
      result.forumTopicId = toNum(item.forumTopicId)
    }
    if (item.forumId) {
      result.forumId = toNum(item.forumId)
    }
    if (item.viewedDate) {
      result.viewedDate = toDate(item.viewedDate)
    }
    if (item.sorting) {
      result.sorting = toNum(item.sorting)
    }
    if (item.durationPlan) {
      result.durationPlan = toNum(item.durationPlan)
    }
    if (item.descriptionInBbcode) {
      result.descriptionInBbcode = item.descriptionInBbcode === 'Y'
    }
    if (item.accomplices) {
      result.accomplices = item.accomplices.map(i => toNum(i))
    }
    if (item.subStatus) {
      result.subStatus = toNum(item.subStatus)
    }
    if (item.creator) {
      result.creator = Object.assign(item.creator, {id: toNum(item.creator.id)})
    }
    if (item.responsible) {
      result.responsible = Object.assign(item.responsible, {id: toNum(item.responsible.id)})
    }
    if (item.accomplicesData) {
      result.accomplicesData =
        Object.values(item.accomplicesData).map(i => Object.assign(i, {id: toNum(i.id)}))
    }
    if (item.allowTimeTracking) {
      result.allowTimeTracking = item.allowTimeTracking === 'Y'
    }

    if (item.tags) {
      result.tags = values<iBXRestTaskHttpTag>(item.tags).map(i => {
        return {
          id: toNum(i.id),
          title: i.title
        }
      })
    }

    return Object.assign(item, result)
  }
}

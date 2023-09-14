import { Injectable } from '@angular/core'
import BaseMapServices from './base'
import { iBXRestHttpTask, iBXRestTask } from '../typification/rest/task/task'


@Injectable({
  providedIn: 'root'
})
export class BXRestTaskMap extends BaseMapServices {

  add(item: iBXRestHttpTask): iBXRestTask{
    return this.TaskBXHttpToTaskBX(item)
  }

  get(item: iBXRestHttpTask): iBXRestTask{
    return this.TaskBXHttpToTaskBX(item)
  }

  list(item: iBXRestHttpTask[]): iBXRestTask[]{
    return  item.map( i =>  this.TaskBXHttpToTaskBX(i))
  }

  private TaskBXHttpToTaskBX(item: iBXRestHttpTask): iBXRestTask {
    let result: iBXRestTask = {}
    if(item.id) { result.id = this.toNum(item.id) }
    if(item.parentId) { result.parentId = this.toNum(item.parentId) }
    if(item.priority) { result.priority = this.toNum(item.priority) }
    if(item.status) { result.status = this.toNum(item.status) }
    if(item.multitask) { result.multitask = item.multitask === 'Y' }
    if(item.groupId) { result.groupId = this.toNum(item.groupId) }
    if(item.stageId) { result.stageId = this.toNum(item.stageId) }
    if(item.createdBy) { result.createdBy = this.toNum(item.createdBy) }
    if(item.createdDate) { result.createdDate = this.toDate(item.createdDate) }
    if(item.responsibleId) { result.responsibleId = this.toNum(item.responsibleId) }
    if(item.changedBy) { result.changedBy = this.toNum(item.changedBy) }
    if(item.changedDate) { result.changedDate = this.toDate(item.changedDate) }
    if(item.statusChangedBy) { result.statusChangedBy = this.toNum(item.statusChangedBy) }
    if(item.statusChangedDate) { result.statusChangedDate = this.toDate(item.statusChangedDate) }
    if(item.closedBy) { result.closedBy = this.toNum(item.closedBy) }
    if(item.closedDate) { result.closedDate = this.toDate(item.closedDate) }
    if(item.dateStart) { result.dateStart = this.toDate(item.dateStart) }
    if(item.deadline) { result.deadline = this.toDate(item.deadline) }
    if(item.startDatePlan) { result.startDatePlan = this.toDate(item.startDatePlan) }
    if(item.endDatePlan) { result.endDatePlan = this.toDate(item.endDatePlan) }
    if(item.forumTopicId) { result.forumTopicId = this.toNum(item.forumTopicId) }
    if(item.forumId) { result.forumId = this.toNum(item.forumId) }
    if(item.viewedDate) { result.viewedDate = this.toDate(item.viewedDate) }
    if(item.sorting) { result.sorting = this.toNum(item.sorting) }
    if(item.durationPlan) { result.durationPlan = this.toNum(item.durationPlan) }
    if(item.descriptionInBbcode) { result.descriptionInBbcode = item.descriptionInBbcode === 'Y' }
    if(item.accomplices) { result.accomplices = item.accomplices.map(i =>this.toNum(i)) }
    if(item.subStatus) { result.subStatus = this.toNum(item.subStatus) }
    if(item.creator) { result.creator = Object.assign(item.creator, {id: this.toNum(item.creator.id)}) }
    if(item.responsible) { result.responsible = Object.assign(item.responsible, {id: this.toNum(item.responsible.id)}) }
    if(item.accomplicesData) {
      result.accomplicesData =
        Object.values(item.accomplicesData).map(i => Object.assign(i, {id: this.toNum(i.id)}))  }
    if(item.allowTimeTracking) { result.allowTimeTracking = item.allowTimeTracking === 'Y' }

    return Object.assign(item, result)
  }
}

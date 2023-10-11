import { iBXRestTaskFieldsName } from '../../task/base/fieldsName'
import { iBXRestHttpTask, iBXRestHttpTaskGroupHttp } from '../../task/task'

export default interface iBXRestParamTasksGet {
  taskId: number, // Идентификатор задачи
  select?: iBXRestTaskFieldsName[] // массив выводимых полей
}

export interface iBXRestTasksTaskGetHttp<T extends iBXRestHttpTasksTaskGet | iBXRestTasksTaskGetHttpDefault> {
  task: T | undefined
}

export interface iBXRestHttpTasksTaskGet extends iBXRestHttpTask {}


/**
 * Если при запросе tasks.task.get не указывать выводимые поля (select) отдаст этот набор
 */
export interface iBXRestTasksTaskGetHttpDefault extends iBXRestHttpTask {
  closedDate: null
  createdDate: string
  durationFact: string
  group: iBXRestHttpTaskGroupHttp
  additionalData: any[]
  id: string
  image: string
  membersCount: number
  name: string
  opened: boolean
  groupId: string
  projectId: string
  timeEstimate: string
  timeSpentInLogs: string
  title: string
}

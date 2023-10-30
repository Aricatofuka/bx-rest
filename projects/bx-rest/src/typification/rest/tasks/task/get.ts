import { iBXRestTaskFieldsName } from '../base/fieldsName'
import { iBXRestHttpTask, iBXRestHttpTaskGroupHttp } from '../task'
import { SnakeToCamelCase } from 'snake-camel-types'

export default interface iBXRestParamTasksTaskGet<S extends iBXRestTaskFieldsName[]> {
  taskId: number, // Идентификатор задачи
  select?: S // массив выводимых полей
}

export interface iBXRestTasksTaskGetHttp<S extends iBXRestTaskFieldsName[]> {
  task: iBXRestHttpTasksTaskGet<S> | undefined
}

// export type iBXRestTasksTaskGet<S extends iBXRestTaskFieldsName> = {
//   [K in SnakeToCamelCase<Lowercase<S[][number]>>]: iBXRestTask[K];
// }

type iBXRestHttpTasksTaskGet<S extends iBXRestTaskFieldsName[]> = {
  [K in SnakeToCamelCase<Lowercase<S[number]>>]: iBXRestHttpTask[K];
};

// export interface iBXRestHttpTasksTaskGet extends iBXRestHttpTask {}


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

import { iBXRestTaskFieldsName } from '../base/fieldsName'
import { iBXRestHttpTask, iBXRestHttpTaskGroupHttp, iBXRestTask } from '../task'
import { SnakeToCamelCase } from 'snake-camel-types'
import { ToUpperCaseKeys } from '../../../base/upper-case-keys'
import { ObjectToSnake } from 'ts-case-convert/lib/caseConvert'

export interface iBXRestParamTasksTaskGet<CustomFields extends object> {
  taskId: number, // Идентификатор задачи
  select?: (iBXRestTaskFieldsName | keyof ToUpperCaseKeys<ObjectToSnake<CustomFields>> | '*' | 'UF_*')[] // массив выводимых полей
}

export interface iBXRestParamTasksTaskGetBase {
  taskId: number, // Идентификатор задачи
  select?: (iBXRestTaskFieldsName  | '*' | 'UF_*')[] // массив выводимых полей
}

export interface iBXRestTasksTaskGetHttpBase<S extends iBXRestTaskFieldsName[]> {
  task: iBXRestHttpTasksTaskGetBase<S> | undefined
}

export interface iBXRestTasksTaskGetHttp<S extends iBXRestTaskFieldsName[], CustomFields = {}> {
  task: iBXRestHttpTasksTaskGet<S, CustomFields> | undefined
}

export type iBXRestTasksTaskGetBase<S extends iBXRestTaskFieldsName[]> = {
  [K in SnakeToCamelCase<Lowercase<S[number]>>]: iBXRestTask[K];
}

export type iBXRestTasksTaskGet<S extends iBXRestTaskFieldsName[], CustomFields> = {
  [K in SnakeToCamelCase<Lowercase<S[number]>>]: iBXRestTask[K];
} & CustomFields

export type iBXRestHttpTasksTaskGetBase<S extends iBXRestTaskFieldsName[]> = {
  [K in SnakeToCamelCase<Lowercase<S[number]>>]: iBXRestHttpTask[K];
}

type iBXRestHttpTasksTaskGet<S extends iBXRestTaskFieldsName[], CustomFields> = {
  [K in SnakeToCamelCase<Lowercase<S[number]>>]: iBXRestHttpTask[K];
} & CustomFields

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

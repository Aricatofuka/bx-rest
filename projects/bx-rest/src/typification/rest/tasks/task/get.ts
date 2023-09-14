import { iBXRestTaskFieldsName } from '../../task/base/fieldsName'

export default interface iBXRestParamTasksGet {
  taskId: number, // Идентификатор задачи
  select?: iBXRestTaskFieldsName[] // массив выводимых полей
}

import SelectRequestApiTaskBX from '@/lib/typification/bitrix/api/rest/task/requests/SelectRequestApiTaskBX'

export default interface RequestApiTaskBX {
  taskId: number, // Идентификатор задачи
  select?: SelectRequestApiTaskBX[] // массив выводимых полей
}

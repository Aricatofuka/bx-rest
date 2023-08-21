import { TaskBX, TaskBXHttp } from '@/lib/typification/bitrix/api/rest/task/task'

export interface AnswerApiTaskBX{
  result:  {
    tasks: TaskBX[] | undefined
  },
  next?: number,
  total?: number,
}

export interface AnswerApiTaskOneBX{
  result:  {
    task: TaskBX | undefined
  },
  next?: number,
  total?: number,
}

export interface AnswerApiTaskOneBXHttp{
  result:  {
    task: TaskBXHttp | undefined
  },
  next?: number,
  total?: number,
}

export interface AnswerApiTaskBXHttp{
  result:  {
    tasks: TaskBXHttp[] | undefined
  },
  next?: number,
  total?: number,
}

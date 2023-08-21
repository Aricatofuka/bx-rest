import { iSaveHttpTaskTime } from './saveHttpTaskTime'
import { iBXRestTask } from '../task'


export interface iStoreTask {
  data: {
    http: { time: iSaveHttpTaskTime[], list: iBXRestTask[] },
    fields: iGetFieldsDescription | undefined
  },
}

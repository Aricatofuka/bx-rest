import { iAddCommentTask } from '@/lib/typification/bitrix/api/rest/task/comment/add'

export interface iUpdateCommentTask extends iAddCommentTask {
  ITEMID: number
}

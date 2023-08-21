import RequestParamsElapsedItemGetList from '@/lib/typification/bitrix/api/rest/task/requests/elapseditemGetlist'
import { BXRestElapsed } from '@/lib/typification/bitrix/api/rest//task/elapsed/get'
import { iBXRestAnswer } from '../../base/answer';

export interface iSaveHttpTaskTime {
  filter: RequestParamsElapsedItemGetList,
  time: iBXRestAnswer<BXRestElapsed[]>
}

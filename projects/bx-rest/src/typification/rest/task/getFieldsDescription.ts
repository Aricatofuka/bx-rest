import SelectRequestApiTaskBX from '@/lib/typification/bitrix/api/rest/task/requests/SelectRequestApiTaskBX'
import { iBXRestYesNo } from '@/lib/typification/bitrix/api/rest/base/YesNo'
import { iFieldBXType } from '@/lib/typification/bitrix/api/rest/base/fieldBXType'


export type iGetFieldsDescription = {
  [Property in keyof SelectRequestApiTaskBX]: iGetFieldsDescriptionBody
}

export interface iGetFieldsDescriptionBody {
  title: string | null,
  type: iFieldBXType,
  default?: any
  values?: {[Property in keyof iBXRestYesNo]: string}
}

import { iBXRestImDialogGet, iBXRestImDialogGetHttp } from '../../typification/rest/im/dialog/get'
import { toDate, toNum } from '../../services/base'


export class BXRestMapImDialog {
  static get(value: iBXRestImDialogGetHttp | undefined): iBXRestImDialogGet | undefined {
    return (value)
      ? {
        ...value,
        ...{
          id: toNum(value.id),
          owner: toNum(value.owner),
          date_create: toDate(value.date_create),
        }
      }
      : undefined
  }
}
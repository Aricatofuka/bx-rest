import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { BXRestNavvyElapseditem } from '../elapseditem'

export class BXRestNavvyOperationElapseditem {

  constructor(
    private BXRestNavvyElapseditem: BXRestNavvyElapseditem
  ) {
  }

  getByInterval(idsUsers: number[], dateStart: Date, dateEnd: Date) {
    const param: iBXRestParamElapseditemGet = {
      ORDER: {
        ID: 'DESC'
      },
      FILTER: {
        USER_ID: idsUsers,
        '>=CREATED_DATE': dateStart.toLocaleString('ru-Ru'),
        '<=CREATED_DATE': dateEnd.toLocaleString('ru-Ru'),
      }
    }
    return this.BXRestNavvyElapseditem.getList(param)
  }
}

import { iBXRestSonetGroupGet, iBXRestSonetGroupGetHttp } from '../typification/rest/sonet_group/get'
import { toDate, toNum } from '../services/base'

export class BXRestMapSonetGroup {

  static get(items: iBXRestSonetGroupGetHttp[] | undefined): iBXRestSonetGroupGet[] | undefined {
    return (items) ? items.map(i => BXRestMapSonetGroup.iBXRestParamSonetHttpToiBXRestParamSonet(i)) : undefined
  }

  static iBXRestParamSonetHttpToiBXRestParamSonet(items: iBXRestSonetGroupGetHttp): iBXRestSonetGroupGet {
    return Object.assign(items, {
      ID: toNum(items.ID),
      DATE_CREATE: toDate(items.DATE_CREATE),
      DATE_UPDATE: toDate(items.DATE_UPDATE),
      ACTIVE: items.ACTIVE == 'Y',
      VISIBLE: items.VISIBLE == 'Y',
      OPENED: items.OPENED == 'Y',
      CLOSED: items.CLOSED == 'Y',
      SUBJECT_ID: toNum(items.SUBJECT_ID),
      OWNER_ID: toNum(items.OWNER_ID),
      NUMBER_OF_MEMBERS: toNum(items.OWNER_ID),
      DATE_ACTIVITY: toDate(items.DATE_ACTIVITY),
      PROJECT: items.OPENED == 'Y',
      IS_EXTRANET: items.OPENED == 'Y',
    })
  }
}

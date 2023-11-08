import { Injectable } from '@angular/core'
import { BaseMapServices } from './base'
import { iBXRestParamSonet, iBXRestParamSonetHttp } from '../typification/rest/sonet_group/get'


@Injectable({
  providedIn: 'root'
})
export class BXRestMapSonetGroup extends BaseMapServices {

  get(items: iBXRestParamSonetHttp[] | undefined): iBXRestParamSonet[] | undefined {
    return (items) ? items.map(i => this.iBXRestParamSonetHttpToiBXRestParamSonet(i)) : undefined
  }

  private iBXRestParamSonetHttpToiBXRestParamSonet(items: iBXRestParamSonetHttp): iBXRestParamSonet {
    return Object.assign(items, {
      ID: this.toNum(items.ID),
      DATE_CREATE: this.toDate(items.DATE_CREATE),
      DATE_UPDATE: this.toDate(items.DATE_UPDATE),
      ACTIVE: items.ACTIVE == 'Y',
      VISIBLE: items.VISIBLE == 'Y',
      OPENED: items.OPENED == 'Y',
      CLOSED: items.CLOSED == 'Y',
      SUBJECT_ID: this.toNum(items.SUBJECT_ID),
      OWNER_ID: this.toNum(items.OWNER_ID),
      NUMBER_OF_MEMBERS: this.toNum(items.OWNER_ID),
      DATE_ACTIVITY: this.toDate(items.DATE_ACTIVITY),
      PROJECT: items.OPENED == 'Y',
      IS_EXTRANET: items.OPENED == 'Y',
    })
  }
}

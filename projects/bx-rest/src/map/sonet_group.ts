import { Injectable } from '@angular/core'
import { BaseMapServices } from '@/lib/services/map/base'
import { iBXWorkgroup, iBXWorkgroupHttp } from '@/lib/typification/bitrix/api/rest/sonet_group/list_workgroup'

@Injectable({
    providedIn: 'root'
})
export class SonetGroupMapServices extends BaseMapServices {
    iBXWorkgroupHttpToiBXWorkgroup(items: iBXWorkgroupHttp): iBXWorkgroup {
        return Object.assign(items,{
            ID: this.toNumber(items.ID),
            DATE_CREATE: this.toDate(items.DATE_CREATE),
            DATE_UPDATE: this.toDate(items.DATE_UPDATE),
            ACTIVE: items.ACTIVE == 'Y',
            VISIBLE: items.VISIBLE == 'Y',
            OPENED: items.OPENED == 'Y',
            CLOSED: items.CLOSED == 'Y',
            SUBJECT_ID: this.toNumber(items.SUBJECT_ID),
            OWNER_ID: this.toNumber(items.OWNER_ID),
            NUMBER_OF_MEMBERS: this.toNumber(items.OWNER_ID),
            DATE_ACTIVITY: this.toDate(items.DATE_ACTIVITY),
            PROJECT: items.OPENED == 'Y',
            IS_EXTRANET: items.OPENED == 'Y',
        })
    }
}

import { Injectable } from '@angular/core'
import HttpBXServices from '@/lib/services/api/bitrix/http/HttpBX'
import iHttpAnswerBX from '@/lib/typification/bitrix/api/rest/base/httpAnswerBX';
import { iDiskAttachedObject, iDiskAttachedObjectHttp } from '@/lib/typification/bitrix/api/rest/disk/AttachedObject'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import BaseServices from '@/lib/services/base'
import { $disk, $get } from '@/lib/services/api/bitrix/rest/consts/part-name-metods'

@Injectable({
    providedIn: 'root'
})
export class DiskAttachedObjectServices extends BaseServices {
    url = {
        get: [$disk, 'attachedObject', $get]
    }

    constructor(private http: HttpBXServices) {
        super()
    }

    get(id: number): Observable<iHttpAnswerBX<iDiskAttachedObject> | undefined> {
        return this.http.post<iHttpAnswerBX<iDiskAttachedObjectHttp>>(this.url.get, {id: id}).pipe(
            map(v => {
                    if (v && v.result) {
                        return Object.assign(v, {
                            result: {
                                ID: this.toNumber(v.result.ID),
                                OBJECT_ID: this.toNumber(v.result.OBJECT_ID),
                                ENTITY_ID: this.toNumber(v.result.ENTITY_ID),
                                CREATE_TIME: this.toDate(v.result.CREATE_TIME),
                                CREATED_BY: this.toNumber(v.result.CREATED_BY),
                                SIZE: this.toNumber(v.result.SIZE)
                            }
                        })
                    }
                    return undefined
                }
            )
        )
    }
}

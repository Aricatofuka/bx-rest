import { Observable } from 'rxjs'
import { HttpParams } from '@angular/common/http'
import { iHttpParamSettings } from '../../../typification/rest/settings'
import { BaseHttp } from './base'

export class BaseHttpServices extends BaseHttp {

    public httpGet<T>(
        url: string,
        params = {},
        settings: iHttpParamSettings = this.defSettings
    ): Observable<T | undefined> {
        return this.http.get<T | undefined>(url, {
            params: this.getHttpParamsGet(params, new HttpParams(), false, [], settings)
        })
    }

    public httpPost<T>(url: string,
                       params: any = {},
                       settings: iHttpParamSettings = this.defSettings
    ): Observable<T | undefined> {
        return this.http.post<T | undefined>(
            url,
            this.getHttpParamsPost(params, new FormData(), false, [], settings)
        )
    }
}

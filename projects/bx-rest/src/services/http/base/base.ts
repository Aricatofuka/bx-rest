import { iHttpParamSettings } from '../../../typification/rest/settings'
import { Observable } from 'rxjs'
import { HttpData } from '../HttpData'

export abstract class BaseHttp extends HttpData {

    abstract httpGet<T>(
        url: string,
        params: any,
        settings: iHttpParamSettings
    ): Observable<T | undefined>

    abstract httpPost<T>(url: string,
                       params: any ,
                       settings: iHttpParamSettings
    ): Observable<T | undefined>
}

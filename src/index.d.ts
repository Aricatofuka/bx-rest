import { iHttpParamSettings } from 'bx-rest/src/typification/rest/settings'
import { Observable, of } from 'rxjs'

export declare class BaseHttp {
    httpGet<T>(
        url: string,
        params: any,
        textError: string,
        settings: iHttpParamSettings
    ): Observable<T | undefined>

    httpPost<T>(url: string,
                         params: any ,
                         textError: string,
                         settings: iHttpParamSettings
    ): Observable<T | undefined>

    handleError<T>(result?: T, textError?: string): Observable<T>
}

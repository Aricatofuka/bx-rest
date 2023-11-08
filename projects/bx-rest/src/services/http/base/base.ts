import { iHttpParamSettings } from '../../../typification/rest/settings'
import { HttpClient } from '@angular/common/http'
import { Observable, of, } from 'rxjs'
import { HttpData } from '../HttpData'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export abstract class BaseHttp extends HttpData {

    protected constructor(public http: HttpClient) {
        super()
    }

    abstract httpGet<T>(
        url: string,
        params: any,
        settings: iHttpParamSettings
    ): Observable<T | undefined>

    abstract httpPost<T>(url: string,
                       params: any ,
                       settings: iHttpParamSettings
    ): Observable<T | undefined>

    handleError<T>(
        result?: T) {
        return (error: Error): Observable<T> => {
            console.error(`failed: ${error.message}`)
            return of(result as T)
        };
    }
}

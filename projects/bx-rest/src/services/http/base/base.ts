// import { iHttpParamSettings } from '../../../typification/rest/settings'
// import { iHttpParamSettings } from 'bx-rest/typification/rest/settings'

import { iHttpParamSettings } from 'bx-rest/typification/rest/settings'
import { HttpClient } from '@angular/common/http'
import SnackBarService from 'bx-rest/services/snack-bar/snack-bar.service'
import { Observable, of, } from 'rxjs'
import { HttpData } from 'bx-rest/services/http/HttpData'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export abstract class BaseHttp extends HttpData {

    protected constructor(public http: HttpClient, public snackBar: SnackBarService) {
        super()
    }

    abstract httpGet<T>(
        url: string,
        params: any,
        textError: string,
        settings: iHttpParamSettings
    ): Observable<T | undefined>

    abstract httpPost<T>(url: string,
                       params: any ,
                       textError: string,
                       settings: iHttpParamSettings
    ): Observable<T | undefined>

    handleError<T>(
        result?: T,
        textError = 'получения данных') {
        return (error: Error): Observable<T> => {
            console.error(`failed: ${error.message}`)
            this.snackBar.error('Ошибка: ' + textError)
            return of(result as T)
        };
    }
}

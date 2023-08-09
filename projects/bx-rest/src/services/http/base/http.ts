import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HttpParams } from '@angular/common/http'
import { iHttpParamSettings } from '../../../typification/rest/settings'
import { BaseHttp } from '../../../services/http/base/base'

export class BaseHttpServices extends BaseHttp {

    public httpGet<T>(
        url: string,
        params = {},
        textError = '',
        settings: iHttpParamSettings = this.defSettings
    ): Observable<T | undefined> {
        return this.http.get<T | undefined>(url, {
            params: this.getHttpParamsGet(params, new HttpParams(), false, [], settings)
        }).pipe(
            catchError(err => {
                if (!textError.length && err.error.error_description) {
                    textError = err.error.error_description
                }

                this.snackBar.error('Ошибка: ' + textError)
                return throwError(() => err)
            })
        )
    }

    public httpPost<T>(url: string,
                       params: any = {},
                       textError = '',
                       settings: iHttpParamSettings = this.defSettings
    ): Observable<T | undefined> {
        return this.http.post<T | undefined>(
            url,
            this.getHttpParamsPost(params, new FormData(), false, [], settings)
        ).pipe(
            catchError(err => {
                if (!textError.length && err.error.error_description) {
                    textError = err.error.error_description
                }

                this.snackBar.error('Ошибка: ' + textError)
                console.error(err)
                return throwError(() => err)
            })
        )
    }

    // TODO: доделать
    // httpPostBaseWithFile<T>(url: string,
    //                         params: any = {},
    //                         textError = ''): Observable<T | undefined> {
    //     let searchFile = Object.values(params).find((i: any) => i instanceof Blob)
    //     if (searchFile) {
    //         return this.http.post<T | undefined>(url, this.getHttpParamsPost(params)).pipe(
    //             catchError(err => {
    //                 this.snackBar.error('Ошибка: ' + textError)
    //                 console.error(err)
    //                 return throwError(() => err)
    //             })
    //         )
    //     } else {
    //         return this.httpPost(url, params, textError)
    //     }
    // }
}

import { BaseServices } from 'bx-rest/services/base'
import { HttpParams } from '@angular/common/http'
import { iHttpParamSettings } from 'bx-rest/typification/rest/settings'
import iHttpAnswerBX from 'bx-rest/typification/rest/base/httpAnswerBX'

export class HttpData extends BaseServices {

    defSettings: iHttpParamSettings = {
        timeZone: {
            calc: true,
            levelOut: false
        }
    }

    getHttpParamsGet( // не так уж и сложно сделать сложенный HttpParams, да гугл?
        obj: any,
        sendHttpParams: HttpParams = new HttpParams(),
        thisArray = false,
        nesting: string[] = [],
        // settings = this.defSettings
        _ = this.defSettings
    ): any {
        for (const key in obj) {
            let setKey = ''
            if (nesting.length) {
                let first = nesting[0]
                setKey = (nesting.length > 1)
                    ? first + '[' + nesting.slice(1).join('][') + '][' + key + ']'
                    : first + '[' + key + ']'
            } else {
                setKey = key
            }
            switch (typeof obj[key]) {
                case 'string':
                    sendHttpParams = sendHttpParams.set(setKey, obj[key])
                    break
                case 'symbol':
                case 'number':
                case 'bigint':
                case 'boolean':
                    sendHttpParams = sendHttpParams.set(setKey, String(obj[key]))
                    break
                case 'object':
                    nesting.push(key)
                    sendHttpParams = this.getHttpParamsGet(obj[key], sendHttpParams, false, nesting)
                    nesting.pop()
                    break
                case 'function':
                case 'undefined':
                default:
                    console.error('Ты отправил что-то не то', obj[key], typeof obj[key], typeof obj)
            }
        }
        return sendHttpParams
    }

    getHttpParamsPost(
        obj: any,
        sendHttpParams: FormData = new FormData(),
        thisArray = false,
        nesting: string[] = [],
        settings = this.defSettings
    ): any {

        if (obj instanceof Blob) {
            let first = nesting[0]
            let setKey = (nesting.length > 1)
                ? first + '[' + nesting.slice(1).join('][') + ']'
                : first
            sendHttpParams.set(setKey, obj)
            return sendHttpParams
        } else if (obj instanceof Date) {
            let first = nesting[0]
            let tzoffset = (settings.timeZone.calc) ?  obj.getTimezoneOffset() * 60000 : 0 // вычисляем влияние часового пояса
            let setKey = (nesting.length > 1)
                ? first + '[' + nesting.slice(1).join('][') + ']'
                : first
            sendHttpParams.set(setKey, (new Date(obj.valueOf() + tzoffset)).toISOString())
            return sendHttpParams
        } else {
            for (const key in obj) {
                let setKey = ''
                if (nesting.length) {
                    let first = nesting[0]
                    setKey = (nesting.length > 1)
                        ? first + '[' + nesting.slice(1).join('][') + '][' + key + ']'
                        : first + '[' + key + ']'
                } else {
                    setKey = key
                }
                switch (typeof obj[key]) {
                    case 'string':
                        sendHttpParams.set(setKey, obj[key])
                        break
                    case 'symbol':
                    case 'number':
                    case 'bigint':
                    case 'boolean':
                        sendHttpParams.set(setKey, String(obj[key]))
                        break
                    case 'object':
                        nesting.push(key)
                        sendHttpParams = this.getHttpParamsPost(
                            obj[key],
                            sendHttpParams,
                            false,
                            nesting,
                            settings
                        )
                        nesting.pop()
                        break
                    case 'function':
                    case 'undefined':
                    default:
                        console.error('Ты отправил что-то не то', obj[key], typeof obj[key], typeof obj)
                }
            }
        }
        return sendHttpParams
    }

    mapResult<T>(v: iHttpAnswerBX<T> | undefined): T | undefined {
        if (v && (v.result || typeof v.result === 'boolean')) {
            return v.result
        }
        return undefined
    }

    sliceArrayIntoChunks(arr: any[], chunkSize: number) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    removingMultipleSlashes(str: string) {
        return str.replace(/\/{2,}/g, '/')
    }
}

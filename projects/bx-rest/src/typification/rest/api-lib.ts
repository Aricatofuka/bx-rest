import { Injectable } from '@angular/core'
import { iRestLib } from './lib'

@Injectable({
    providedIn: 'root'
})
export class RestServices {
    BX24: iRestLib | false = false

    constructor() {
        // @ts-ignore
        this.BX24 = (window.BX24) ? window.BX24 : false
    }

    init(callBack: Function) {
        return (this.BX24) ? this.BX24.init(callBack) : false
    }
}

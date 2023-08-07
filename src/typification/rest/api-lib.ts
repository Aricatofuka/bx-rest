import { Injectable } from '@angular/core'
import { iBxApiLib } from '@/lib/typification/bitrix/BxApiLib'

@Injectable({
    providedIn: 'root'
})
export class ApiLibServices {
    BX24: iBxApiLib | false = false

    constructor() {
        // @ts-ignore
        this.BX24 = (window.BX24) ? window.BX24 : false
    }

    init(callBack: Function) {
        return (this.BX24) ? this.BX24.init(callBack) : false
    }
}

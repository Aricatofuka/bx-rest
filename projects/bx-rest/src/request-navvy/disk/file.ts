import { Injectable } from '@angular/core'
import { BaseServices } from '../../services/base'
import { map } from 'rxjs/operators'
import { BXRestDiskFile } from '../../request/disk/file'

@Injectable({
    providedIn: 'root'
})
export class BXRestNavvyDiskFile extends BaseServices {

    constructor(private BXRestDiskFile: BXRestDiskFile) {
        super()
    }

    get(id: number) {
        return this.BXRestDiskFile.get(id).pipe(
            map(v => {
                if (v && v.result) {
                    let newResult = Object.assign(v.result, {SIZE: this.toNum(v.result.SIZE)})
                    return Object.assign(v, {
                        result: newResult
                    })
                }
                return undefined
            })
        )
    }

    markDel(id: number) {
      return this.BXRestDiskFile.markDel(id)
            .pipe(
                map(v => {
                    if (v && v.result) {
                        let newResult = Object.assign(v.result, {SIZE: this.toNum(v.result.SIZE)})
                        return Object.assign(v, {
                            result: newResult
                        })
                    }
                    return undefined
                })
            )
    }
}

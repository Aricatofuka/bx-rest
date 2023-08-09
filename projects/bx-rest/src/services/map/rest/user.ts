import { Injectable } from '@angular/core'
import BaseMapServices from '@/bx-rest/services/map/base'
import { iBXRestUser, iBXRestUserHttp } from '@/bx-rest/typification/rest/user/user'
import clone from 'just-clone'

@Injectable({
    providedIn: 'root'
})
export class BitrixApiUserMapServices extends BaseMapServices {

    HttpToBX(user: iBXRestUserHttp): iBXRestUser {
        let res: iBXRestUser = Object.assign(clone(user), {
            ID: this.toNumber(user.ID),
            IS_ONLINE: this.toBool(user.IS_ONLINE),
            DATE_REGISTER: this.toDate(user.DATE_REGISTER),
            PERSONAL_BIRTHDAY: this.toDate(user.PERSONAL_BIRTHDAY),
        })
        if (user.LAST_LOGIN) {
            res.LAST_LOGIN = this.toDate(user.LAST_LOGIN)
        }

        return res
    }

    BXtoHttp(user: iBXRestUser): iBXRestUserHttp {
        return Object.assign(clone(user), {
            ID: this.toStr(user.ID),
            IS_ONLINE: this.toBXYorN(user.IS_ONLINE),
            DATE_REGISTER: this.getBXStrTime(user.DATE_REGISTER),
            PERSONAL_BIRTHDAY: this.toStr(user.PERSONAL_BIRTHDAY),
            LAST_LOGIN: this.toStr(user.LAST_LOGIN)
        })
    }

    getFIO(user: iBXRestUser): string {
        let res = ''
        if (!user.LAST_NAME) {
            const SECOND_NAME = (user.SECOND_NAME) ? user.SECOND_NAME : ''
            const NAME = (user.NAME) ? user.NAME : ''
            res = NAME + ' ' + SECOND_NAME
        } else if (!user.NAME) {
            res = user.LAST_NAME
        } else if (!user.SECOND_NAME) {
            res = user.LAST_NAME + ' ' + user.NAME
        } else {
            res = user.LAST_NAME + ' ' + user.NAME + ' ' + user.SECOND_NAME
        }
        return res.trim()
    }

    getFI(user: iBXRestUser): string {
        let res = ''
        if (!user.LAST_NAME) {
            const NAME = (user.NAME) ? user.NAME : ''
            res = NAME
        } else if (!user.NAME) {
            res = user.LAST_NAME
        } else {
            res = user.LAST_NAME + ' ' + user.NAME
        }
        return res.trim()
    }

    getFIOShort(user: iBXRestUser): string {
        let res = ''
        if (!user.LAST_NAME) {
            const SECOND_NAME = (user.SECOND_NAME) ? user.SECOND_NAME : ''
            const NAME = (user.NAME) ? user.NAME : ''
            res = NAME + ' ' + SECOND_NAME
        } else if (!user.NAME) {
            res = user.LAST_NAME
        } else if (!user.SECOND_NAME) {
            res = user.LAST_NAME + ' ' + user.NAME.charAt(0).toUpperCase() + '.'
        } else {
            res =
                user.LAST_NAME + ' ' +
                user.NAME.charAt(0).toUpperCase() + '.' +
                user.SECOND_NAME.charAt(0).toUpperCase() + '.'
        }
        return res.trim()
    }
}

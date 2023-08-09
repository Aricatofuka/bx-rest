import { iBXRestYesNo } from 'bx-rest/typification/rest/base/YesNo'

export interface iBXRestUser extends iBXRestUserBase {
    ID: number,
    IS_ONLINE: boolean,
    DATE_REGISTER: Date,
    PERSONAL_BIRTHDAY: Date,
    LAST_LOGIN?: Date
}

export interface iBXRestUserHttp extends iBXRestUserBase {
    ID: string,
    IS_ONLINE: iBXRestYesNo,
    DATE_REGISTER: string,
    PERSONAL_BIRTHDAY: string,
    LAST_LOGIN?: string
}

interface iBXRestUserBase {
    ACTIVE: boolean,
    EMAIL: string,
    NAME: string,
    LAST_NAME: string,
    SECOND_NAME: string,
    PERSONAL_GENDER: iAllBXGender,
    PERSONAL_PROFESSION: string,
    PERSONAL_WWW: string,
    PERSONAL_BIRTHDAY: string | Date,
    PERSONAL_PHOTO: string,
    PERSONAL_ICQ: string,
    PERSONAL_PHONE: string,
    PERSONAL_FAX: string,
    PERSONAL_MOBILE: string,
    PERSONAL_PAGER: string,
    PERSONAL_STREET: string,
    PERSONAL_CITY: string,
    PERSONAL_STATE: string,
    PERSONAL_ZIP: string,
    PERSONAL_COUNTRY: string,
    TIME_ZONE: string,
    TIME_ZONE_OFFSET: string,
    WORK_COMPANY: string,
    WORK_POSITION: string,
    WORK_PHONE: string,
    UF_DEPARTMENT: number[]
    UF_INTERESTS: string,
    UF_SKILLS: string,
    UF_WEB_SITES: string,
    UF_XING: string,
    UF_LINKEDIN: string,
    UF_FACEBOOK: string,
    UF_TWITTER: string,
    UF_SKYPE: string,
    UF_DISTRICT: string,
    UF_PHONE_INNER: string,
    [keys: string]: any // Поля каcтомные поля для приложений
}

export type iAllBXGender = 'M' | 'F' | '' // wtf BX? Where is others 48 gender?

export type iBXRestUserKey = keyof iBXRestUser

export type MapKeyBx<Type> = {
    [Property in keyof Type]: string
}

export interface iBXRestUserHttpField extends MapKeyBx<iBXRestUserBase>{
}

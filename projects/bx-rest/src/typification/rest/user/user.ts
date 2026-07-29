import { iBXRestYesNo } from '../base/yes-no'

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
    LAST_NAME: string | null,
    SECOND_NAME: string | null,
    PERSONAL_GENDER?: iAllBXGender,
    PERSONAL_PROFESSION?: string,
    PERSONAL_WWW?: string,
    PERSONAL_BIRTHDAY: string | Date,
    PERSONAL_PHOTO: string | null,
    PERSONAL_ICQ: string | null,
    PERSONAL_PHONE: string | null,
    PERSONAL_FAX: string | null,
    PERSONAL_MOBILE: string | null,
    PERSONAL_PAGER: string | null,
    PERSONAL_STREET: string | null,
    PERSONAL_CITY: string | null,
    PERSONAL_STATE: string| null,
    PERSONAL_ZIP: string | null,
    PERSONAL_COUNTRY: string | null,
    TIME_ZONE?: string,
    TIME_ZONE_OFFSET?: string,
    WORK_COMPANY?: string,
    WORK_POSITION: string | null,
    WORK_PHONE?: string,
    UF_DEPARTMENT: number[] | null,
    UF_INTERESTS?: string | null,
    UF_SKILLS?: string | null,
    UF_WEB_SITES?: string | null,
    UF_XING?: string | null,
    UF_LINKEDIN?: string | null,
    UF_FACEBOOK?: string | null,
    UF_TWITTER?: string | null,
    UF_SKYPE?: string | null,
    UF_DISTRICT?: string | null,
    UF_PHONE_INNER?: string | null,
    [keys: string]: any // Поля каcтомные поля для приложений
}

export type iAllBXGender = 'M' | 'F' | '' // wtf BX? Where is others 48 gender?

export type iBXRestUserKey = keyof iBXRestUser

export type MapKeyBx<Type> = {
    [Property in keyof Type]: string
}

export interface iBXRestUserHttpField extends MapKeyBx<iBXRestUserBase>{
}

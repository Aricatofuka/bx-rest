import { CountryCode, TimezoneName } from 'countries-and-timezones'
import { iBXRestYesNo } from '../../base/YesNo'
import { iBXRestCalendarType } from '../base/type'


export interface iBXRestCalendarEventGetAnswer extends iBXRestCalendarEventGetAnswerBase{
    ATTENDEE_LIST: {id: number, entryId: number, status: 'Y' | 'N' | 'H'}[]
    CREATED_BY: string
    DATE_CREATE: Date
    DATE_FROM: Date
    DATE_FROM_TS_UTC: number
    DATE_TO: Date
    DATE_TO_TS_UTC: number
    DELETED: boolean
    DT_LENGTH: number
    DT_SKIP_TIME: boolean
    MEETING_STATUS: boolean
    EXDATE: Date[] // тут преобразование из строки где через ";" идет перечисление дат
    ID: number
    MEETING_HOST: number
    ORIGINAL_DATE_FROM: Date | null
    OWNER_ID: number
    PARENT_ID: number
    RECURRENCE_ID: number
    SECTION_ID: number
    SECT_ID: number
    TIMESTAMP_X: Date
    TZ_OFFSET_FROM: number
    TZ_OFFSET_TO: number
    VERSION: number
    RRULE: null | iBXRestCalendarEventGetAnswerRule
}

export interface iBXRestCalendarEventGetAnswerHttp extends iBXRestCalendarEventGetAnswerBase {
    ATTENDEE_LIST?: {id: number, entryId: string, status: 'Y' | 'N' | 'H'}[]
    CREATED_BY: string
    DATE_CREATE: string
    DATE_FROM: string
    DATE_FROM_TS_UTC: string
    DATE_TO: string
    DATE_TO_TS_UTC: string
    DELETED: iBXRestYesNo
    DT_LENGTH: string
    DT_SKIP_TIME: iBXRestYesNo
    MEETING_STATUS: iBXRestYesNo
    EXDATE: string
    ID: string
    MEETING_HOST: string
    ORIGINAL_DATE_FROM: string | null
    OWNER_ID: string
    PARENT_ID: string
    RECURRENCE_ID: string
    RRULE: "" | iBXRestCalendarEventGetAnswerRuleHttp
    SECTION_ID: string
    SECT_ID: string
    TIMESTAMP_X: string
    TZ_OFFSET_FROM: string
    TZ_OFFSET_TO: string
    VERSION: string
}

export interface iBXRestCalendarEventGetAnswerBase {
    ACCESSIBILITY: 'busy' // TODO: Разобраться
    ATTENDEES_CODES: string[] // TODO: тут разобраться корректно ли будет преобразовывать в число так как формат выбран как U1091 где u - user 1091 - id
    CAL_DAV_LABEL: null
    CAL_TYPE: iBXRestCalendarType
    COLOR: string // код формата #685gdf возможно можно затайпить, но сейчас это будет тумач (сейчас нет таких задач)
    DAV_EXCH_LABEL: null // TODO: Разобраться
    DAV_XML_ID: string
    EVENT_TYPE: null // TODO: Разобраться
    G_EVENT_ID: null // TODO: Разобраться
    IMPORTANCE: 'normal' // TODO: Разобраться
    IS_MEETING: boolean
    LOCATION: string
    RINDEX?: number,
    MEETING: {
        ALLOW_INVITE: boolean
        HIDE_GUESTS: boolean
        HOST_NAME: string
        LANGUAGE_ID: Lowercase<CountryCode>
        MAIL_FROM: string
        MEETING_CREATOR: number
        NOTIFY: boolean
        REINVITE: boolean
    } | null
    NAME: string
    PRIVATE_EVENT: "" // TODO: Разобраться
    RELATIONS: {COMMENT_XML_ID: string}
    REMIND: {type: 'min', count: number}[] // TODO: Разобраться
    SYNC_STATUS: null // TODO: Разобраться
    TZ_FROM: TimezoneName
    TZ_TO: TimezoneName
    UF_CRM_CAL_EVENT: boolean
    UF_WEBDAV_CAL_EVENT: boolean
    attendeesEntityList?: {entityId: iBXRestCalendarType, id: number}[] | null
    '~USER_OFFSET_FROM': number
    '~USER_OFFSET_TO': number
}

interface iBXRestCalendarEventGetAnswerRuleHttp extends iBXRestCalendarEventGetAnswerRuleBase {
    UNTIL: string
    '~UNTIL': string
}

interface iBXRestCalendarEventGetAnswerRule extends iBXRestCalendarEventGetAnswerRuleBase {
    UNTIL: Date
    '~UNTIL': Date
}

type iBXRestCalendarEventGetAnswerRuleBase = {
    FR?: 'FR'
    MO?: 'MO'
    WE?: 'WE'
    FREQ: 'WEEKLY'
    INTERVAL: number
}

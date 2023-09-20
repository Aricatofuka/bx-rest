import { iBXRestCalendarType } from '../base/type'

export interface iBXRestCalendarEventGetParam {
    type: iBXRestCalendarType
    ownerId?: number,
    from?: Date
    to?: Date
    section?: any // TODO: разобраться
}

export interface iBXRestTaskElapsedItem extends iBXRestTaskElapsedItemBase {
    ID: number
    MINUTES: number
    SECONDS: number
    TASK_ID: number
    USER_ID: number
    SOURCE: number
    CREATED_DATE: Date
    DATE_START: Date
    DATE_STOP: Date
}

export interface iBXRestTaskElapsedItemHttp extends iBXRestTaskElapsedItemBase {
    ID: string
    MINUTES: string
    SECONDS: string
    TASK_ID: string
    USER_ID: string
    SOURCE: string
    CREATED_DATE: string
    DATE_START: string
    DATE_STOP: string
}


export interface iBXRestTaskElapsedItemBase {
    COMMENT_TEXT: string
}

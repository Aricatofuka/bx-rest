export interface iBXRestElapsedItem extends iBXRestElapsedItemBase {
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

export interface iBXRestElapsedItemHttp extends iBXRestElapsedItemBase {
    ID: string
    MINUTES: string
    SECONDS: string
    TASK_ID: string
    USER_ID: string
    SOURCE: string
    COMMENT_TEXT: string
    CREATED_DATE: string
    DATE_START: string
    DATE_STOP: string
}


export interface iBXRestElapsedItemBase {
    COMMENT_TEXT: string
}

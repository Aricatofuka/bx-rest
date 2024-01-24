export type iBXRestAnswer<T> = iBXRestAnswerSuccess<T> | iBXRestAnswerError

export interface iBXRestAnswerSuccess<T> {
    result?: T | undefined
    next?: number
    total?: number
    time?: {
        start: number
        finish: number
        duration: number
        processing: number
        date_start: string
        date_finish: string
    }
}

export interface iBXRestAnswerError {
    error?: string,
    error_description?: string
}
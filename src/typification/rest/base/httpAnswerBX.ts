export default interface iHttpAnswerBX<T> {
    result?: T | undefined,
    next?: number,
    total?: number,
    time?: {
        start: number,
        finish: number,
        duration: number,
        processing: number,
        date_start: string,
        date_finish: string
    },
    error?: string,
    error_description?: string
}

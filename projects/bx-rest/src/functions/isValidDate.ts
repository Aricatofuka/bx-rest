import { isDate } from './isDate'

export const isValidDate = (value: any): value is Date => {
    if (isDate(value)) {
        return !isNaN(value.getTime())
    }

    return false
}

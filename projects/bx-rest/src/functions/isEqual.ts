import { isDate } from './isDate'

/**
 * Checks if the two passed arguments are equal
 * Currently supports date objects
 *
 * @param obj1
 * @param obj2
 * @returns: `boolean`
 * @hidden
 */
export const isEqual = (obj1: any, obj2: any): boolean => {
    if (isDate(obj1) && isDate(obj2)) {
        return obj1.getTime() === obj2.getTime()
    }
    return obj1 === obj2
}

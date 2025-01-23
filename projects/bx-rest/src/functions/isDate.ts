/**
 * Checks if provided variable is Date
 *
 * @param value Value to check
 * @returns true if provided variable is Date
 * @hidden
 */
export const isDate = (value: any): value is Date => value instanceof Date

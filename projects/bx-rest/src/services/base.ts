import { DateTime, DateTimeOptions } from 'luxon'

/**
 * Преобразует значение в строку
 *
 * @param val
 * @param throwError
 */
export function toStr(val: any, throwError = false): string {
  if (val === null || val === undefined) {
    if (throwError) {
      throw new Error(`Invalid value: ${val} cannot be converted to string`)
    }
    return ''
  }
  return String(val)
}

/**
 * Преобразует значение в число
 */
export function toNum(val: any, throwError = true, defValue = 0): number {
  const result = Number(val)

  if (isNaN(result)) {
    const error = new ToNumError(val)

    if (throwError) throw error

    // Если ошибка не пробрасывается — просто логируем
    console.error(error.toString())
    return defValue
  }

  return result
}

/**
 * Кастомный тип ошибки для числовых преобразований
 */
export class ToNumError extends Error {
  constructor(public readonly value: any) {
    const valueType = typeof value
    const formattedValue =
      valueType === 'object' ? JSON.stringify(value) : String(value)
    const message = `Invalid value passed to toNum(): ${formattedValue} (type: ${valueType})`
    super(message)
    this.name = 'ToNumError'

    // сохраняем стек вызова (отфильтровав сам конструктор)
    if (this.stack) {
      const stackLines = this.stack.split('\n')
      // Удаляем строку конструктора (чтобы стек начинался с места вызова toNum)
      this.stack = [stackLines[0], ...stackLines.slice(2)].join('\n')
    }
  }

  override toString(): string {
    return [
      `❌ [${this.name}] ${this.message}`,
      this.stack ? `   Stack trace:\n${this.stack}` : '',
    ].join('\n')
  }
}

/**
 * Преобразует значение в дату
 */
export function toDate(val: number | string | Date, format?: string, opt?: DateTimeOptions, throwError = true): Date {
  if (val instanceof Date) {
    return val
  } else if (typeof val === 'string') {
    if (format) {
      if (opt) {
        return DateTime.fromFormat(val, format, opt).toJSDate()
      }
      return DateTime.fromFormat(val, format).toJSDate()
    } else {
      return new Date(val)
    }
  } else if (typeof val === 'number') {
    return new Date(val)
  }

  if (throwError) {
    console.error('Wrong date format', val, format)
    throw new Error('Wrong date format')
  }

  return new Date()
}

/**
 * Преобразует дату в строку с учетом временной зоны
 *
 * @param date
 * @param throwError
 */
export function toISOStringWithTimezone(date: Date, throwError = true): string {
  if (!(date instanceof Date)) {
    if (throwError) throw new Error('Invalid value: not a valid Date object')
    return ''
  }

  const tzOffset = -date.getTimezoneOffset()
  const diff = tzOffset >= 0 ? '+' : '-'
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0')
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60)
}

/**
 * Преобразует значение в булево значение
 *
 * @param val
 * @param throwError
 */
export function toBool(val: any, throwError = true): boolean {
  switch (typeof val) {
    case 'string':
      val = val.toLowerCase()
      if (val === 'n' || val === 'y') { // битриксовые понятия о bool
        return val === 'y'
      } else if (val === 'true' || val === 'false') { // битриксовые понятия о bool
        return val === 'true'
      } else {
        if (throwError) throw new Error('Invalid value: cannot be converted to boolean')
        return false
      }
    default:
      return Boolean(val)
  }
}

/**
 * Преобразует булево значение в 'Y' или 'N'
 *
 * @param val
 */
export function toBXYorN(val: boolean): string {
  return val ? 'Y' : 'N'
}

export function getBaseUrlHttps(url: string, component = false): string {
  if (component) {
    return encodeURI(cropUrl(url) + '/')
  } else {
    return encodeURI('https://' + cropUrl(url) + '/')
  }
}

/**
 * Обрезает URL (удаляет протокол)
 *
 * @param url
 */
export function cropUrl(url: string): string {
  url = url ? url.replace('https://', '') : ''
  url = url ? url.replace('http://', '') : ''
  url = url ? url.replace('https:', '') : ''
  url = url ? url.replace('http:', '') : ''
  return url
}

/**
 * Преобразует файл в base64
 *
 * @param file
 */
export function getBase64File(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

/**
 * Получить файл в формате base64 с разбивкой на заголовок и данные
 *
 * @param file
 */
export async function getBase64FileLikeStr(file: File): Promise<{
  header: string,
  val: string
} | undefined> {
  const result = await getBase64File(file)
  if (typeof result === 'string') {
    const split = result.split(',')
    return {
      header: split[0],
      val: split[1]
    }
  }
  return undefined
}

export function prepareBaseAddress(url: string, add: string | undefined = '') {
  // if (url.search('https://') !== 0 && url.search('http://')) {
  //   url = 'https://' + url
  // }

  if (add && add.length > 0) {
    if (url.lastIndexOf('/') !== (url.length - 1)) {
      url = url + '/'
    }

    url = url + add
  }

  if (url.lastIndexOf('/') !== (url.length - 1)) {
    url = url + '/'
  }

  return url
}
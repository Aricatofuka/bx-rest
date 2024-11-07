import { Injectable } from '@angular/core'
import { time } from '../consts/time'
import { DateTime } from 'luxon'
import { DateTimeOptions } from 'luxon/src/datetime'

@Injectable({
  providedIn: 'root'
})
export class BaseServices {

  toStr(val: any): string {
    return (val) ? String(val) : ''
  }

  toNum(val: any): number {
    return (val && Number(val)) ? Number(val) : 0
  }

  toDate(val: number | string | Date, format?: string, opt?: DateTimeOptions): Date {
    if (val instanceof Date) {
      return val
    } else if (typeof val == 'string') {
      if (format) {
        if (opt) {
          return DateTime.fromFormat(val, format, opt).toJSDate()
        }
        return DateTime.fromFormat(val, format).toJSDate()
      } else {
        return new Date(val)
      }
    } else if (typeof val == 'number') {
      return new Date(val)
    }
    console.error('Wrong date format', val, format)
    throw 'Wrong date format'
  }

  getBXStrTime(date: Date): string {
    return this.toISOStringWithTimezone(date)
  }

  toISOStringWithTimezone(date: Date): string {
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

  toBool(val: any) {
    switch (typeof val) {
      case 'string':
        val = val.toLowerCase()
        if (val === 'n' || val === 'y') { // битриксовые понятия о bool
          return val === 'y'
        } else if (val === 'true' || val === 'false') { // битриксовые понятия о bool
          return val === 'true'
        } else {
          return false
        }
      default:
        return Boolean(val)
    }
  }

  toBXYorN(val: boolean) {
    return (val) ? 'Y' : 'N'
  }

  typeof(val: any) {
    return typeof val
  }

  prepareBaseAddress(url: string, add: string | undefined = '') {
    if (url.search('https://') !== 0 && url.search('http://')) {
      url = 'https://' + url
    }

    if(add && add.length > 0) {
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

  dateDiff(a: Date, b: Date) {
    return new Date(a.valueOf() - b.valueOf())
  }

  dateDiffInDays(a: Date, b: Date) {
    return Math.floor(this.dateDiff(a, b).valueOf() / time.oneDayMilliseconds)
  }

  getBase64File(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  async getBase64FileLikeStr(file: File): Promise<{ header: string, val: string } | undefined> {
    let result = await this.getBase64File(file)
    if (typeof result === 'string') {
      let split = result.split(',')
      return {
        header: split[0],
        val: split[1]
      }
    }
    return undefined
  }
}

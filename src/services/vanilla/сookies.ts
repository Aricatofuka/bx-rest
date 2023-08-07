import { Injectable } from '@angular/core'
import JSON from '@/lib/services/vanilla/JSON'

@Injectable({
  providedIn: 'root'
})
export default class CookiesServices {

  static get(name: string): string {
    const results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (results)
      return results[2]
    else
      return ''
  }

  static set(name: string, value: string, age: number = 0) {
    let string = name + '=' + value + ';'
    if(age) {
      string += ' max-age=' + age
    }
    string += '; SameSite=None; Secure'
    document.cookie = string
  }

  static setObj(name: string, value: any, age: number = 0) {
    let string = name + '=' + JSON.serialize(value) + ';'
    if(age) {
      string += ' max-age=' + age
    }
    string += '; SameSite=None; Secure'
    document.cookie = string
  }

  static getObj<T>(name: string): T | false {
    const results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (results) {
      return JSON.deserialize(results[2])
    }

    return false
  }
}

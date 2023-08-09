import { Injectable } from '@angular/core'
import JSON from '../../services/vanilla/JSON'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServices {

  static get(name: string): any {
    return localStorage.getItem(name)
  }

  static getObj<T>(name: string): T | null {
    return JSON.deserialize(localStorage.getItem(name))
  }

  static set(name: string, value: string): void {
    localStorage.setItem(name, value)
  }

  static setObj(name: string, value: any): void {
    let get = this.get(name)
    if(get && typeof get === 'object'){
      localStorage.setItem(
        name,
        JSON.serialize(
          Object.assign(
            get,
            value
          )
        )
      )
    } else {
      localStorage.setItem(name, JSON.serialize(value))
    }
  }

  static del(name: string): void {
    localStorage.removeItem(name)
  }

}

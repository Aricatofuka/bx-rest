import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServices {

  static get(name: string): any {
    return localStorage.getItem(name)
  }

  static getObj<T>(name: string): T | null {
    const localData = localStorage.getItem(name)
    return (localData) ? JSON.parse(localData) as T : null
  }

  static set(name: string, value: string): void {
    localStorage.setItem(name, value)
  }

  static setObj(name: string, value: any): void {
    let get = this.get(name)
    if(get && typeof get === 'object'){
      localStorage.setItem(
        name,
        JSON.stringify(
          Object.assign(
            get,
            value
          )
        )
      )
    } else {
      localStorage.setItem(name, JSON.stringify(value))
    }
  }

  static del(name: string): void {
    localStorage.removeItem(name)
  }

}

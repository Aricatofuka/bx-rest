import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageServices {

  setItem(name: string, value: any){
    sessionStorage.setItem(name, JSON.stringify(value))
  }

  getItem<T>(name: string){
    const res = sessionStorage.getItem(name)
    if(res){
      return JSON.parse(res) as T
    }
    return undefined
  }
}

export class SessionStorage {

  static setItem(name: string, value: any){
    sessionStorage.setItem(name, JSON.stringify(value))
  }

  static getItem<T>(name: string){
    const res = sessionStorage.getItem(name)
    if(res){
      return JSON.parse(res) as T
    }
    return undefined
  }
}

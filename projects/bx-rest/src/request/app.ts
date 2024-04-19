import { Injectable } from '@angular/core'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestAppInfoHttp } from '../typification/rest/app/info'
import { methods } from '../methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestApp {

  constructor(
    private http: HttpBXServices,
  ) {
  }

  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info() {
    return this.http.post<iBXRestAppInfoHttp>(methods.app.info)
  }
}

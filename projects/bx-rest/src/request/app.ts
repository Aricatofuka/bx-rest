import { inject, Injectable } from '@angular/core'
import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestAppInfoHttp } from '../typification/rest/app/info'
import { methods } from '../typification/base/methods'

@Injectable({
  providedIn: 'root'
})
export class BXRestApp {
  private readonly http = inject(HttpBXServices)

  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info() {
    return this.http.post<iBXRestAppInfoHttp>(methods.app.info)
  }
}

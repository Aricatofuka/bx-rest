import { HttpBXServices } from '../services/http/HttpBX'
import { iBXRestAppInfoHttp } from '../typification/rest/app/info'
import { methods } from '../typification/base/methods'

export class BXRestApp {
  private readonly http = new HttpBXServices()

  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info() {
    return this.http.post<iBXRestAppInfoHttp>(methods.app.info)
  }
}

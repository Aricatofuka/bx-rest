import { Navvy } from '../services/navvy'
import { BXRestMapApp } from '../map/app'
import { iBXRestAppInfo, iBXRestAppInfoHttp } from '../typification/rest/app'

export class BXRestNavvyApp {

  private readonly Navvy = new Navvy()

  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info(){
    return this.Navvy.simple<iBXRestAppInfoHttp, iBXRestAppInfo>(
      ['app', 'info'],
      undefined,
      BXRestMapApp.info
    )
  }
}

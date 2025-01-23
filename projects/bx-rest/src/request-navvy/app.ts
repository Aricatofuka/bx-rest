import { Navvy } from '../services/navvy'
import { BXRestMapApp } from '../map/app'

export class BXRestNavvyApp {

  private readonly Navvy = new Navvy()

  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info(){
    return this.Navvy.simple(
      ['app', 'info'],
      BXRestMapApp.info
    )
  }
}

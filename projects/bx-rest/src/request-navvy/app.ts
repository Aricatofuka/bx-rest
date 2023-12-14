import { Injectable } from '@angular/core'
import { BXRestApp } from '../request/app'
import { BXRestMapApp } from '../map/app'
import { Navvy } from '../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyApp {

  protected Navvy: Navvy<BXRestApp, BXRestMapApp>

  constructor(
    private BXRestApp: BXRestApp,
    private BXRestMapApp: BXRestMapApp
  ) {
    this.Navvy = new Navvy(this.BXRestApp, this.BXRestMapApp)
  }

  /**
   * Показ информации о приложении. Метод поддерживает безопасный вызов
   */
  info(){
    return this.Navvy.simple(
      this.BXRestApp.info,
      this.BXRestMapApp.info
    )
  }
}
